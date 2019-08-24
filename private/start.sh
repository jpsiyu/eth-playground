#!/bin/bash

geth --datadir ./data --networkid 15 --rpc --rpccorsdomain "*" --rpcapi "eth,web3" --allow-insecure-unlock --mine --minerthreads 1 --etherbase 0x0000000000000000000000000000000000000000
