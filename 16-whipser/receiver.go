package main

import (
	"context"
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

type Receiver struct {
	client *shhclient.Client
	keyID  string
}

func NewReceiver(keyID string) *Receiver {
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		log.Fatal((err))
	}

	return &Receiver{
		client: client,
		keyID:  keyID,
	}
}

func (receiver *Receiver) run() {
	messages := make(chan *whisperv6.Message)
	criteria := whisperv6.Criteria{
		PrivateKeyID: receiver.keyID,
	}

	sub, err := receiver.client.SubscribeMessages(context.Background(), criteria, messages)

	if err != nil {
		log.Fatal(err)
	}
	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case message := <-messages:
			fmt.Println(string(message.Payload))
		}
	}
}
