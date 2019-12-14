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

	tm "github.com/buger/goterm"
	"github.com/ethereum/go-ethereum/whisper/shhclient"
)

func clear() {
	tm.Clear()
	tm.MoveCursor(1, 1)
	tm.Flush()
}

func main() {
	clear()
	keyID := common.GenKey()
	client, err := shhclient.Dial("ws://127.0.0.1:8546")
	if err != nil {
		log.Fatal((err))
	}

	user := common.RandomUser()

	receiver := receive.NewReceiver(&user, client, keyID)
	go receiver.Run()

	sender := send.NewSender(&user, client, keyID)
	fmt.Println("Enter your message:")
	for {
		reader := bufio.NewReader(os.Stdin)
		msg, _ := reader.ReadString('\n')
		msg = strings.Replace(msg, "\n", "", -1)
		sender.Say(msg)
	}
}
