export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Cards-Microservice",
    "description": "Credit Cards CRD APIs",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "host": "localhost:3000",
  "basePath": "/",
  "tags": [
    {
      "name": "Cards Microservice",
      "description": "API for CRD operations on Cards in the system"
    }
  ],
  "schemes": ["http"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths": {
    "/cards": {
      "get": {
        "tags": ["Cards"],
        "summary": "Get all cards from DB",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Cards"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "404": {
            "description": "API Not Found",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
        }
      }
    },
    "/addCard": {
      "post": {
        "tags": ["Cards"],
        "description": "Insert a card into the DB",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "description": "Card that we want to insert",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "201": {
            "description": "New Card is inserted",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "404": {
            "description": "API Not Found",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          }

        }
      }
    },
    "/deleteCard": {
      "delete": {
        "tags": ["Cards"],
        "description": "Delete a card from the DB",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "description": "Card that we want to delete",
            "schema": {
              "$ref": "#/definitions/CardDeleteRequest"
            }
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "Card is Deleted",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "404": {
            "description": "API Not Found",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/CardResponse"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Card": {
      "required": ["customerName", "cardNumber", "limit"],
      "properties": {
        "cardNumber": {
          "type": "string",
          "uniqueItems": true
        },
        "customerName": {
          "type": "string"
        },
        "limit": {
          "type": "integer"
        },
      },
      "example": {
        "cardNumber": "4809344282531711",
        "customerName": "Test Swagger",
        "limit": 1000
      }
    },
    "Cards": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Card"
      }
    },
    "CardDeleteRequest": {
      "type": "object",
      "properties": {
        "cardNumber": {
          "type": "string"
        }
      },
      "example": {
        "cardNumber": "4809344282531711",
      }
    },

    "CardResponse": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      }
    }
  },
}