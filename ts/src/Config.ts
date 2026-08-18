
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'PassantenfrequenzenZuerich',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://data.stadt-zuerich.ch",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      frequenzen: {
      },

      standorte: {
      },

    }
  }


  entity = {
    "frequenzen": {
      "fields": [
        {
          "name": "age_group",
          "type": "`$STRING`"
        },
        {
          "name": "count",
          "type": "`$INTEGER`"
        },
        {
          "name": "direction",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "type": "`$STRING`"
        },
        {
          "name": "temperature",
          "type": "`$NUMBER`"
        },
        {
          "name": "timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "weather",
          "type": "`$STRING`"
        },
        {
          "name": "zone",
          "type": "`$INTEGER`"
        }
      ],
      "name": "frequenzen",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "2023-12-31T23:59:59Z",
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2023-01-01T00:00:00Z",
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "zone",
                    "orig": "zone",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_fussgaengerfrequenzen_seit2021.csv",
              "parts": [
                "dataset",
                "hystreet_fussgaengerfrequenzen",
                "download",
                "hystreet_fussgaengerfrequenzen_seit2021.csv"
              ],
              "select": {
                "exist": [
                  "end_date",
                  "location",
                  "start_date",
                  "zone"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "standorte": {
      "fields": [
        {
          "name": "geometry",
          "type": "`$OBJECT`"
        },
        {
          "name": "properties",
          "type": "`$OBJECT`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        }
      ],
      "name": "standorte",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/dataset/hystreet_fussgaengerfrequenzen/download/hystreet_locations.json",
              "parts": [
                "dataset",
                "hystreet_fussgaengerfrequenzen",
                "download",
                "hystreet_locations.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.features`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

