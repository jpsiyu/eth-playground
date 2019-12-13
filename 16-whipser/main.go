package main

import (
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	fmt.Println("haha")
	//client, err := ethclient.Dial("http://localhost:8545")
	client, err := ethclient.Dial("ws://192.168.0.111:8546")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("connection established")
	_ = client
}
