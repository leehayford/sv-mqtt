/* 
License:

	[PROPER LEGALESE HERE...]

	INTERIM LICENSE DESCRIPTION:
	In spirit, this license:
	1. Allows <Third Party> to use, modify, and / or distributre this software in perpetuity so long as <Third Party> understands:
		a. The software is porvided as is without guarantee of additional support from DataCan in any form.
		b. The software is porvided as is without guarantee of exclusivity.

	2. Prohibits <Third Party> from taking any action which might interfere with DataCan's right to use, modify and / or distributre this software in perpetuity.
*/

import { SECRET_MQTT_USER, SECRET_MQTT_PW } from "./secret"

const APP_VERSION = "0.0.0"
/* TODO : REPLACE WITH ENV VARIABLES FOR PRODUCTION *******************************/
const local = true
export const debugging = true
export const showIDs = true
export const SERVER = ( local ? "://127.0.0.1:8011" : "://plotz.datacan.net" )
export const HTTP_SERVER = ( local ? `http${ SERVER }` : `http${ SERVER }` )
export const WS_SERVER = ( local ? `ws${ SERVER }` : `ws${ SERVER }` )

export const MQTT_BROKER_URL = "des2.data2desk.com" // "broker.emqx.io" // "des2.data2desk.com"
export const MQTT_BROKER_WS_PORT = 8083
export const MQTT_BROKER = `ws://${ MQTT_BROKER_URL }:${MQTT_BROKER_WS_PORT}/mqtt`
export const MQTT_USER =  SECRET_MQTT_USER
export const MQTT_PW = SECRET_MQTT_PW
 
/* TODO : REPLACE WITH ENV VARIABLES FOR PRODUCTION *******************************/