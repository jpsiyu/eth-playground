package send

import (
	"context"
	"log"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

type Sender struct {
	client *shhclient.Client
	keyID  string
	pubKey []byte
}

func NewSender(client *shhclient.Client, keyID string) *Sender {
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
