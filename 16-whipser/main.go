package main

import (
	"context"
	"log"
	"runtime"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
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
	go receiver.run()

	// send message
	pub, err := client.PublicKey(context.Background(), keyID)
	if err != nil {
		log.Fatal(err)
	}

	message := whisperv6.NewMessage{
		Payload:   []byte("hello"),
		PublicKey: pub,
		TTL:       60,
		PowTime:   2,
		PowTarget: 2.5,
	}

	hash, err := client.Post(context.Background(), message)
	_ = hash
	if err != nil {
		log.Fatal(err)
	}

	runtime.Goexit()
}
