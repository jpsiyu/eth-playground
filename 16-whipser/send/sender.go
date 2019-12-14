package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"whisper/common"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

type Sender struct {
	client *shhclient.Client
	keyID  string
	pubKey []byte
}

func NewSender(keyID string) *Sender {
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		log.Fatal((err))
	}
	pub, err := client.PublicKey(context.Background(), keyID)
	if err != nil {
		log.Fatal((err))
	}
	return &Sender{
		client: client,
		keyID:  keyID,
		pubKey: pub,
	}
}

func (sender *Sender) Say(msg string) {
	message := whisperv6.NewMessage{
		PublicKey: sender.pubKey,
		Payload:   []byte(msg),
		TTL:       60,
		PowTime:   2,
		PowTarget: 2.5,
	}

	_, err := sender.client.Post(context.Background(), message)
	if err != nil {
		log.Fatal((err))
	}
}

func main() {
	keyID := common.GenKey()
	sender := NewSender(keyID)

	fmt.Println("Enter your message:")
	for {
		reader := bufio.NewReader(os.Stdin)
		msg, _ := reader.ReadString('\n')
		msg = strings.Replace(msg, "\n", "", -1)
		sender.Say(msg)
	}
}
