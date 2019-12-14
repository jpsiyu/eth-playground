package common

func GenKey() string {
	return "4eb750dd525042f2511756aa3e108e6bd26dc7d02df77f04873879278cf33461"
	/*
		client, err := shhclient.Dial("ws://127.0.0.1:8546")
		if err != nil {
			log.Fatal(err)
		}

		keyID, err := client.NewKeyPair(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		return keyID
	*/
}
