module whisper

go 1.12

replace (
	cloud.google.com/go => github.com/googleapis/google-cloud-go v0.49.0
	golang.org/x/crypto => github.com/golang/crypto v0.0.0-20191206172530-e9b2fee46413
	golang.org/x/exp => github.com/golang/exp v0.0.0-20191129062945-2f5052295587
	golang.org/x/image => github.com/golang/image v0.0.0-20191206065243-da761ea9ff43
	golang.org/x/lint => github.com/golang/lint v0.0.0-20191125180803-fdd1cda4f05f
	golang.org/x/mobile => github.com/golang/mobile v0.0.0-20191210151939-1a1fef82734d
	golang.org/x/net => github.com/golang/net v0.0.0-20191209160850-c0dbc17a3553
	golang.org/x/oauth2 => github.com/golang/oauth2 v0.0.0-20191202225959-858c2ad4c8b6
	golang.org/x/sync => github.com/golang/sync v0.0.0-20190911185100-cd5d95a43a6e
	golang.org/x/sys => github.com/golang/sys v0.0.0-20191210023423-ac6580df4449
	golang.org/x/text => github.com/golang/text v0.3.2
	golang.org/x/time => github.com/golang/time v0.0.0-20191024005414-555d28b269f0
	golang.org/x/tools => github.com/golang/tools v0.0.0-20191213032237-7093a17b0467
	golang.org/x/xerrors => github.com/golang/xerrors v0.0.0-20191204190536-9bdfabe68543
	google.golang.org/api => github.com/googleapis/google-api-go-client v0.14.0
	google.golang.org/appengine => github.com/golang/appengine v1.6.5
	google.golang.org/genproto => github.com/google/go-genproto v0.0.0-20191206224255-0243a4be9c8f
	google.golang.org/grpc => github.com/grpc/grpc-go v1.25.1
)

require github.com/ethereum/go-ethereum v1.9.9
