# ChiCoin

Part of Chicago Blockchain Project (CBP) efforts is to facilitate cooperation and education in local developer community. We plan to realize those efforts through various community projects which anyone can join and contribute. ChiCoin seems as natural starting point - token that will be utilized by community in various manners.

## Minimal Viable Product

The first goal is to create MVP which will allow anyone to "earn" token by checking in at [one of upcoming Meetups](https://www.meetup.com/chicagoblockchainproject/). Even though it seems as a simple case, doing this will require establishing robust infrastructure.

## Specification

We plan to utilize Ethereum and it's ERC20 token scheme to quickly start off the ground. From conceptual standpoint we can identify the prerequisite parts of the system:

 - Authentication and authorization - each participant will need to create private key and tie it to some account in Ethereum system in order to receive tokens. We'll also need to develop basic authorization system, who is allowed to process token giveaway after check in at Meetup is complete
 - Genesis smart contract for ERC20 token

 TODO: Specify use cases further breaking down system for implementation

## System Architecture

The main question is how much of our system can be implemented as a smart contract within Ethereum Blockchain. The parts that can't be included there can either be a distributed app (ĐApp) or we can fall back to standard REST API server paradigm. To err on the side of caution we can start with following parts:

 - Smart contract for ERC20 token
 - REST API server - gateway that also interacts with Ethereum blockchain
 - Android app
 - iOS app

Part of our aim to break down this project into smaller pieces is so that various members of community can participate. That way different expertise (blockchain, web, mobile) can be utilized. 

## Code of conduct

Since this project is non-paid, community work it is likely people will participate for following reasons:

 - They want to learn
 - They want to have fun
 - They want to build something meaningful

Understanding that - anyone wanting to participate should be willing to focus on providing positive feedback. **All negative feedback should be of productive variety - describing not only what is wrong, but also proposing solution to the problem. The individual criticizing should also be willing to CODE proposed change**. We have enough philosophers as-is - so if you are looking for pointless theorizing, just go back to your Facebook feed ;)

## Communication channels

We'll utilize [CBP Slack and #devcorner channel there](https://chiblockchainproject.slack.com/messages/C8Z50DFEF/team/U8LKKDU1K/) as primary meeting place.

Github will be reserved for production communication. In that sense, do not use Issues or Project boards for extended discussion that doesn't related to "coding". If you have any questions, join Slack... it's public and open.