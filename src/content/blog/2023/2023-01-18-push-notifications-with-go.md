---
title: Push Notifications with Go
date: '2023-01-18T17:55'
oldUrl: 'https://samwarnick.com/2023/1/push-notifications-with-go'
published: true
---

I had never sent a push notification in my life. I wanted to try it out. Writing my server in Go, I used the [sideshow/apns2](https://github.com/sideshow/apns2) library.

Being a Go newb, I struggled with a couple things. I was unsure which things needed to be imported. Turns out to use the token method, and the payload builder, three imports are needed:

```go
import (
	"github.com/sideshow/apns2"
	"github.com/sideshow/apns2/payload"
	"github.com/sideshow/apns2/token"
)
```

Then you create a token and client:

```go
authKey, err := token.AuthKeyFromFile("AuthKey_KEYID.p8")
	if err != nil {
		log.Fatal("token error:", err)
	}

	token := &token.Token{
		AuthKey: authKey,
		KeyID:   "KEYID",
		TeamID:  "TEAMID",
	}

	client := apns2.NewTokenClient(token).Production() // or .Development()
```

I used the same key file that I use for WeatherKit. After getting the device tokens to send to, you can create a notification and send it:

```go
...
notification := &apns2.Notification{}
notification.DeviceToken = deviceToken
notification.Topic = "com.your.bundle.id"
notification.Priority = apns2.PriorityHigh
notification.Payload = payload.NewPayload().Alert("I'm a friendly push notification!")
res, err := client.Push(notification)
...
```

You can check the result to make sure it was successful or not. I haven't implemented that because I'm lazy and want to punish myself in the future for it.

With that, I was able to send some push notifications to my iOS app running the the simulator!
