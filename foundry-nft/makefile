-include .env

ANVIL_PRIVATE_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(ANVIL_PRIVATE_KEY) --broadcast

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --account $(ACCOUNT) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

deploy:
	@forge script script/DeployNFT.s.sol:DeployNFT $(NETWORK_ARGS)

mint:
	@forge script script/Interactions.s.sol:MintNFTOnContract ${NETWORK_ARGS}

deployMoodNFT:	
	@forge script script/DeployMoodNFT.s.sol:DeployMoodNFT $(NETWORK_ARGS)

mintMoodNFT:
	@forge script script/MintMoodNFT.s.sol:MintMoodNFT ${NETWORK_ARGS}

flipMoodNFT:
	@forge script script/FlipMoodNFT.s.sol:FlipMoodNFT ${NETWORK_ARGS}