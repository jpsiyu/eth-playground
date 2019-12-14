package common

import (
	"context"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
)

type User struct{
	ID string `json:"id"`
	Name string `json:"name"`
}

type UserMsg struct{
	User User `json:"user"`
	Msg string `json:"msg"`
}

func GenKey() string {
	return "4eb750dd525042f2511756aa3e108e6bd26dc7d02df77f04873879278cf33461"
}

func RandomKey() (error, string) {
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		return err, "" 
	}

	keyID, err := client.NewKeyPair(context.Background())
	if err != nil {
		return err, ""
	}
	return nil, keyID
}

func RandomUser() User{
	return User{
		ID: "124",
		Name: "Tom",
	}
}
