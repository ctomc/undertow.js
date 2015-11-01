/*
 * JBoss, Home of Professional Open Source.
 * Copyright 2014 Red Hat, Inc., and individual contributors
 * as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

$undertow
    .websocket("/websocket1", function (connection) {
        connection.send("connected");
        connection.onText = function(message) {
            return "echo-" + message;
        }
        connection.onBinary = function(message) {
            return message;
        }
        connection.onClose = function (message) {
            print(message.reason + " " + message.code);
        }
    })
    .websocket("/websocket2", ["test:a test injection", function (connection, text) {
        connection.send(text);
    }]);