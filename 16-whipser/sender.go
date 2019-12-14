package main

import (
	"context"
	"log"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

type Sender struct {
	client *shhclient.Client
	keyID  string
}

func NewSender(keyID string) *Sender {
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		log.Fatal((err))
	}
	return &Sender{
		client: client,
		keyID:  keyID,
	}
}

func (sender *Sender) Run() {
	pub, err := sender.client.PublicKey(context.Background(), sender.keyID)
	if err != nil {
		log.Fatal((err))
	}
	message := whisperv6.NewMessage{
		PublicKey: pub,
		Payload:   []byte("Hello"),
		TTL:       60,
		PowTime:   2,
		PowTarget: 2.5,
	}

	hash, err := sender.client.Post(context.Background(), message)
	if err != nil {
		log.Fatal((err))
	}
	log.Println("message sended", hash)
}
