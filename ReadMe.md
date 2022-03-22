# Set-up Environment
1. Follow the step 1 and step 3 in the following manual to install Elasticsearch and logstash (not need to install others): https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-18-04

2. To run logstash we need to add its path to environment variable: (1) install vim, (2) edit .bashrc file by command: vim ~/.bashrc, (3) Add "export PATH="/usr/share/logstash/bin/:$PATH" to the end of the file, (4) Run command: "source ~/.bashrc"

3. Then follow the tutorial to indexing a csv file: https://www.youtube.com/watch?v=_kqunm8w7GI&t=2s

4. Make sure that PostgreSQL is installed

# SEPP Server
These instructions are for Ubuntu Linux. The steps can be adapted for all major platforms.

- Install [NodeJS](https://nodejs.org/en/) (at least version 8.0)
    ```
    sudo apt install npm
    
    // Check if node is installed
    which node
    ```
- Install [MongoDB](https://www.mongodb.com/):

    Execute the four steps of the [MongoDB installation instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)
    ```
    // Check if MongoDB is running
    mongo
    // You should see the mongo client connect to the MongoDB server and show its version number.
    // Exit the client using:
    > exit
    ```
- Install [Redis](https://redis.io/)
    ```
    sudo apt install redis-server
    
    // Start Redis
    redis-server
    
    // Check if Redis is running
    redis-cli
    > PING
    // Should return PONG
    > QUIT
    ```
- Set up the server
    ```
    // Clone the repository
    git clone https://github.com/felipemoraes/searchx-backend.git
    
    // Change directory to repository
    cd searchx-backend
    
    // Install dependencies
    npm install
    
    // Copy example configuration
    cp .env.example .env
    ```
- Choose a search provider
    You can choose between one of the three search providers for which SearchX has included provider modules:
    
    1. [Elasticsearch](#elasticsearch)
    2. [Indri](#indri)
    3. [Bing](#bing)

    The Elasticsearch provider is the easiest to setup with your own dataset, while the Indri provider supports more advanced features such as relevance feedback. The Bing provider is suitable for web search, but requires a (paid) Bing API key. Please see the sections linked for each provider on how to configure and use them. The Bing provider is suitable for web search. If you wish to use another search provider, please see the [custom search providers](#custom-search-providers) section below.
- Run the server
    ```
    // Start the development server
    npm run start
    
    // If you get any errors connecting to MongoDB or Redis they may be running on a different
    // port, instructions for changing the port are in the configuration section below.
    
    // Check if API is running (curl or through browser)
    curl http://localhost:4443
    ```

## Search Providers
You can install the supported search providers as follows. See the [configuration section](#configuration) for how to configure which search provider is used by default.

### Elasticsearch
Execute the [Elasticsearch installation instructions](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/deb.html).

### Indri
1. Execute the [node-indri installation instructions](https://github.com/felipemoraes/node-indri#setup).
2. Copy the built node-indri module from `build/Release/node-indri` inside your node-indri folder to `lib/node-indri` inside your searchx-backend folder (you need to create the lib and node-indri folders first).

### Bing
SearchX requires a [Bing API key](https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/) to use the Bing web search provider.

Once you have a Bing API key, you can paste it into your `.env` file under the key `BING_ACCESS_KEY`. Be careful not to check the key into version control, since this may lead to abuse if the key leaks.

# API Specification 
```
// Search
[address]/v1/search/[vertical]/?query=[query]&page=[pageNumber]&provider=[provider]
- address: address set in the configuration file (testUrl:PORT)
- vertical: search vertical to use, as specified by search provider, eg. (web, images, videos, news) for bing
- userId: the identifier for the user that is issuing this API call
- sessionId: the identifier for the session that the this API call belongs to
- query: query string
- page: page number
- providerName [optional]: the search provider to use (elasticsearch, indri, bing), defaults to DEFAULT_SEARCH_PROVIDER if unset
- relevanceFeedback [optional, false by default]: whether to use relevance feedback (false, individual, shared)
- distributionOfLabour [optional, false by default]: whether to use distribution of labour (false, unbookmarkedSoft, unbookmarkedOnly)
```

#SEPP Client
- Make sure the SEPP server is up and running.

- Set up the server and install dependencies:
    ```
    // Clone the repository
    git clone https://github.com/felipemoraes/searchx-frontend.git
    
    // Change directory to repository
    cd searchx-frontend
    
    // Install dependencies:
    npm install
    
    // Copy example configuration
    cp .env.example .env
    ```

- Start the development server:
    ```
    npm start
    
    // Now check http://localhost:8080/search
    ```