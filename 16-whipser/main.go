package main

import (
	"context"
	"log"
	"runtime"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
)

func main() {
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	//client, err := shhclient.Dial("ws://192.168.0.111:8546")
	if err != nil {
		log.Fatal(err)
	}

	keyID, err := client.NewKeyPair(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	receiver := NewReceiver(keyID)
	go receiver.Run()

	// send message
	sender := NewSender(keyID)
	go sender.Run()

	runtime.Goexit()
}
