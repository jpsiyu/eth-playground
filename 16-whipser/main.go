package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
	"whisper/common"
	"whisper/receive"
	"whisper/send"

	"github.com/ethereum/go-ethereum/whisper/shhclient"
)

func main() {
	keyID := common.GenKey()
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		log.Fatal((err))
	}

	receiver := receive.NewReceiver(client, keyID)
	go receiver.Run()

	sender := send.NewSender(client, keyID)
	fmt.Println("Enter your message:")
	for {
		reader := bufio.NewReader(os.Stdin)
		msg, _ := reader.ReadString('\n')
		msg = strings.Replace(msg, "\n", "", -1)
		sender.Say(msg)
	}
}
