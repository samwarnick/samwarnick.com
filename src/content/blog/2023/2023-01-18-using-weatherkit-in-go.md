---
title: Using WeatherKit in Go
date: '2023-01-18T17:50'
oldUrl: 'https://samwarnick.com/2023/1/using-weatherkit-in-go'
published: true
---

I haven't had a chance to use WeatherKit yet, and I've barely used Go. So for some reason I decided to give both a _go_ at the same time.

WeatherKit has a pretty straightforward REST API available. The trickiest part of it is making the authorization token.

## Making the JWT

I initially followed the steps in [this blog about a Node.js implementation](https://allthecode.co/blog/post/setting-up-weatherkit-rest-api-in-node-js). You have to create a key and identifier in your developer account. After you download the key, write down some IDs, you're good to go.

I used the [golang-jwt/jwt](https://github.com/golang-jwt/jwt) library. Took me a bit to figure out how to add things to the header of the JWT, but I got there. Please don't judge my Go code too harshly—I have barely used it and have no clue what I'm doing.

```go
func signWeatherKitToken() (string, error) {
	privateKeyBytes, err := os.ReadFile("AuthKey_YOUR_KEYID.p8")
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	privateKey, err := jwt.ParseECPrivateKeyFromPEM(privateKeyBytes)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Issuer:    "YOUR_TEAMID",
		Subject:   "com.your.bundle.id",
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	token.Header["kid"] = "YOUR_KEYID"
	token.Header["id"] = "YOUR_TEAMID.com.your.bundle.id"
	tokenString, err := token.SignedString(privateKey)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	return tokenString, nil
}
```

## Using the API

Once you have the token, it's fairly easy to use. Add the token in the Authorization header of the request.

One thing that caught me up was latitude and longitude. I grabbed my coordinates from Apple Maps and plugged them in the url. After a lot of head scratching—because I accidentally was sending my GET request with a body—I got a result. But the result was odd. The forecast said it was currently -8°F. I'm in South Carolina. It is not that cold here. When I was working on it, it was 60°F. Turns out, I needed to put a minus sign in front of the longitude since I am West of the Prime Meridian[^1]. I would've figured this out sooner if I read [the docs](https://developer.apple.com/documentation/weatherkitrestapi/longitude) more carefully.

You also need to make sure you add the `dataSets` query param. Otherwise you get an empty object back, which is not that useful.

All things considered, It wasn't that bad of a process to get things working. Took me a bit to figure out I needed to use `jwt.ParseECPrivateKeyFromPEM` to turn the bytes of the key file into something useful. But now I can get some weather data!

[^1]: Maybe should not admit this, but I'm not sure I could've pulled "Prime Meridian" out of my brain if you asked me what that line is called before all this.
