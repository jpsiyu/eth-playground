#!/bin/bash

geth --datadir ./data --networkid 15 --rpc --rpccorsdomain "*" --rpcapi "eth,web3,,personal,miner,net,txpool" --allow-insecure-unlock --mine --minerthreads 1
