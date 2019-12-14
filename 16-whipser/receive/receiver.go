package receive

import (
	"context"
	"encoding/json"
	"log"
	"whisper/common"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

type Receiver struct {
	client *shhclient.Client
	keyID  string
}

func NewReceiver(client *shhclient.Client, keyID string) *Receiver {
	return &Receiver{
		client: client,
		keyID:  keyID,
	}
}

func (receiver *Receiver) Run() {
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
			var userMsg common.UserMsg
			json.Unmarshal(message.Payload, &userMsg)
			log.Println(userMsg.User.Name, ":", userMsg.Msg)
		}
	}
}
