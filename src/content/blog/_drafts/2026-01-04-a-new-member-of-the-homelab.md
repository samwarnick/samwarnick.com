---
title: A New Member of the Homelab
date: '2026-01-04'
published: false
---

For the last 5 years, my Synology DS920+ was the only machine I had for self-hosting stuff. Most recently, I had a mix of Docker containers and a VM with Ubuntu server and Coolify to host stuff. No longer! I wanted to separate out some apps and services from my Synology to something else. I bought an HP EliteDesk 800 G6 on eBay. And boy, am I going crazy[^1].

!["An HP EliteDesk 800 G6 sitting on top of a Synology DS920+"](/media/IMG_3062.jpg "A very handsome computer if you ask me")

A normal person might have just installed Ubuntu server on the HP[^2], moved over Coolify and called it a day. Not me. For some reason[^3]. I wanted 2 Ubuntu server VMs. One for my internal apps like my home cooked budget app, and one for my public facing apps and sites like [ScreenCred](https://screencred.app) and this blog. The Synology would keep running things like AdGuard, Plex, and HomeBridge. With 2 new VMs, that meant I'd be doing a lot of the same setup work twice. I decided this would be a good time to not only try out Proxmox—a somewhat normal and reasonable idea—but also Terraform and Ansible.

Proxmox is an OS based on Debian that lets you easily run VMs and containers. Terraform lets you write your infrastructure as code. So in my case, instead of going through the Proxmox UI to create VMs, I wrote some code that creates the VMs for me. Then, with Ansible, the VMs get setup automatically. I created a couple Ansible playbooks that do things like update Ubuntu, install Cloudflare tunnels, and setup directories I need for my apps. What does this mean? I can run `./deploy` and Terraform will make sure I have the VMs I need with the defined amount of RAM and storage using the Proxmox API, and Ansible will make sure they are all setup correctly by using SSH to access the VMs.

My setup is on [GitHub](https://github.com/samwarnick/homelab), but as an example, here's some Terraform:

```terraform
proxmox_api_url      = "https://192.168.0.5:8006/api2/json"
proxmox_token_id     = "terraform@pam!token"
proxmox_token_secret = "secret"
gateway              = "192.168.0.1"

vms = {
  example-vm-1 = {
    ip     = "192.168.0.10"
    cores  = 2
    memory = 4096
  }
  example-vm-2 = {
    ip     = "192.168.0.20"
    cores  = 1
    memory = 1024
  }
}

module "vms" {
  source   = "./modules/ubuntu-vm"
  for_each = var.vms

  vm_name   = each.key
  vm_ip     = each.value.ip
  cores     = each.value.cores
  memory    = each.value.memory
  disk_size = each.value.disk_size
  gateway   = var.gateway
}
```

It references a separate module that uses a [Proxmox provider](https://github.com/Telmate/terraform-provider-proxmox) for Terraform.

And some Ansible:

```yml
---
- name: Setup Ubuntu VM
  hosts: vms
  become: true
  gather_facts: false

  tasks:
    - name: Wait for system to become reachable
      wait_for_connection:
        timeout: 120
        delay: 5

    - name: Gather facts after connection is established
      setup:

    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Upgrade all packages
      apt:
        upgrade: dist

    - name: Install QEMU guest agent
      apt:
        name: qemu-guest-agent
        state: present

    - name: Enable and start QEMU guest agent
      systemd:
        name: qemu-guest-agent
        state: started
        enabled: yes

    - name: Create new user
      user:
        name: "{{ new_user }}"
        shell: /bin/bash
        groups: sudo
        append: yes
        create_home: yes
```

TL;DR the code does stuff for me instead of me doing it. Magic. I keep (hopefully) keep all my secrets out of the repo.

This all feels safer to me. I will sometimes fiddle directly on a VM, but I make sure to add any changes to an Ansible playbook to run later. Other times, I make the change directly with Ansible. But I'm much more confident in how my servers are actually setup. If you have any suggestions to improve things, I'd love to hear them.

## Monitoring

In addition to the VMs, I also use Terraform and Ansible to setup an LXC with Grafana and Prometheus. My understanding, an LXC is like a hybrid VM/container. It shares resources with the host, so is more lightweight than a full blown VM, but since it is less isolated, it loses out on some security benefits of using a VM.

I have no idea how to use Grafana or Prometheus, but I did update my Ansible to install some exporters on the VMs—[Node Exporter](https://github.com/prometheus/node_exporter) and [cAdvisor](https://github.com/google/cadvisor). I also added Node Exporter on the Proxmox host and [Prometheus Proxmox VE Exporter](https://github.com/prometheus-pve/prometheus-pve-exporter) to my monitoring LXC. These provide data to Prometheus that is then exposed through Grafana to show some system stats of the host, VMs, LXCs, and Docker containers. So I've got a bunch of stuff available. Not totally sure how to make it more useful for me though.

I also had an LXC with Uptime Kuma, but realized that would be better on my Synology because...

## e1000e NIC

Had this weird thing happen. All the sudden, I couldn't access HP/PVE or the VMs or LXCs. Not sure what was going on, I rebooted the server. After a reboot, I was able to get back in. I dug through some logs and found this:

```
pve kernel: e1000e 0000:00:1f.6 nic0: Detected Hardware Unit Hang:
```

Apparently, [this is a thing](https://www.reddit.com/r/Proxmox/comments/1drs89s/intel_nic_e1000e_hardware_unit_hang/). There is even a [community script](https://community-scripts.github.io/ProxmoxVE/scripts?id=nic-offloading-fix) to hopefully fix it. I installed it and fingers crossed, hasn't happened again…that I know of.

One bummer was that all my monitoring was on the inaccessible server, so I couldn't get any idea of what was going on. I checked Uptime Kuma after, and it had detected the outage, but since the NIC was not working, it could not notify me. I still think it makes sense to have Grafana and Prometheus on the LXC, but I did move Uptime Kuma to my Synology. This way, if my Proxmox host goes down again, _something_ will be able to alert me.

## //TODO:

Things are seemingly working right now and I only broke the DNS for my home network a couple times. But, there is always more to do!

### Soon

Better/more backups. Right now, Proxmox will backup the VMs to my Synology, which will then backup to Backblaze[^4]. I would also like to setup restic or borg to backup my app data more explicitly. 

NUT client. My UPS has a single USB port and that is going to my Synology. I found [this guide on Reddit](https://www.reddit.com/r/synology/comments/gtkjam/use_synology_nas_as_ups_server_to_safely_power/?rdt=38567) on how to setup Synology to notify other machines on the network to turn off when it gets a signal from the UPS to turn off. That seems cool/useful/cheaper than buying another UPS.

### Soonish?

Drop Coolify? I came across [a post from someone moving off Coolify](https://hamy.xyz/blog/2025-08_coolify-to-ansible) to their own Ansible setup. After getting a taste of infrastructure as code, I think I get it. I think I will be moving my way towards that. When I migrated Coolify, I had a few issues trying to restore from my backup. So it ended up being easier for me to setup my few apps again. But I'd like to avoid that in the future. I think that may involve me setting up Gitea to run pipelines or something. Not sure yet.

### Long term

Dedicated router hardware. I've been running into issues with running AdGuard on my Synology[^5]. Maybe a justification, but I think I could clean things up by having a new machine dedicated to routing, firewall, and DNS. I think I'd like Ubiquiti, but also looking at something that could run OPNSense. "Need" more control. And a managed switch to make some VLANs.

Cluster. If you have 3—2 if you're crafty—Proxmox machines, you can put them in an high availability cluster. My understanding is that if one machine fails, it will move all the VMs and LXCs to other available machines automatically. Overkill, but awesome.

[^1]: Maybe in a good way?
[^2]: I have no idea what to call this machine. HP? G6? PVE for Proxmox? Something more clever?
[^3]: Jared says "Because _it's fun_"
[^4]: Actually, I need to check that the VM backups are actually being sent to Backblaze...
[^5]: Perhaps a story for another day, but long story short, my AdGuard was not receiving IPv4 DNS requests and I had to change some Docker stuff to fix that.