package main

import (
	"fmt"
	"log"
	"context"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/whisper/shhclient"
	"github.com/ethereum/go-ethereum/whisper/whisperv6"
)

func main() {
	fmt.Println("haha")
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	//client, err := shhclient.Dial("ws://192.168.0.111:8546")
	if err != nil {
		log.Fatal(err)
	}

	keyID, err := client.NewKeyPair(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("key id", keyID)

	pub, err := client.PublicKey(context.Background(), keyID)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("pub key", keyID, hexutil.Encode(pub))

	message := whisperv6.NewMessage{
		Payload: []byte("hello"),
		PublicKey: pub,
		TTL: 60,
		PowTime: 2,
		PowTarget: 2.5,
	}

	hash, err := client.Post(context.Background(), message)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("hash", hash)
}
