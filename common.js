Devices = new Mongo.Collection('devices');
Modules = new Mongo.Collection('modules');
Plants = new Mongo.Collection('plants');
Stats = new Mongo.Collection('stats');

var Schemas = {};
/**
 * @summary Instance of the MongoDb Schema Devices. When we boot up a new device we add it mac address.
 * @instancename Devices
 * @class
 */
Schemas.Devices = new SimpleSchema({
    macAddress: {
        type: String,
        label: "Mac Address",
        max: 6
    },
    firstTime: {
        type: Boolean,
        label: "First Time"
    }
});
/**
 * @summary Instance of the MongoDb Schema Modules. 
 * @instancename Modules
 * @class
 */
Schemas.Modules = new SimpleSchema({
    idDevice: {
        type: String,
        label: "Device's Id"
    },
    idPlant: {
        type: String,
        label: "Plant's Id",
        optional: true
    }
});
/**
 * @summary Instance of the MongoDb Schema Plants. This is all the datas we can have to monitore our plants.
 * @instancename Plants
 * @class
 */
Schemas.Plants = new SimpleSchema({
    name: {
        type: String,
        label: "Plant's Name",
        optional: true
    },
    images: {
        type: String,
        label: "Images",
        optional: true
    },
    latinName: {
        type: String,
        label: "Plant's Latin Name",
        optional: true
    },
    temperatureMax: {
        type: Number,
        label: "Max Temperature",
        optional: true
    },
    temperatureMin: {
        type: Number,
        label: "Min Temperature",
        optional: true
    },
    light: {
        type: Number,
        label: "Sun",
        optional: true
    },
    water: {
        type: Number,
        label: "Water",
        optional: true
    },
    planting: {
        type: String,
        label: "Planting",
        optional: true
    },
    growth: {
        type: String,
        label: "Growth",
        optional: true
    },
    blooming: {
        type: String,
        label: "Blooming",
        optional: true
    },
    soilIrr: {
        type: String,
        label: "Soil And Irrigation",
        optional: true
    },
    pruning: {
        type: String,
        label: "Pruning",
        optional: true
    },
    pests: {
        type: String,
        label: "Pests",
        optional: true
    },
});
/**
 * @summary Instance of the MongoDb Schema Stats. TO keep traces of the datas transmitted by the modules.
 * @instancename Stats
 * @class
 */
Schemas.Stats = new SimpleSchema({
    idModule: {
        type: String,
        label: "Module's Id"
    },
    date: {
        type: Date,
        label: "Date"
    },
    temperature: {
        type: Number,
        decimal: true,
        label: "Temperature",
    },
    light: {
    	type: Number,
        decimal: true,
        label: "Sun",
    },
    water: {
    	type: Number,
        decimal: true,
        label: "Water",
    },
});

/**
 * @summary This is creating a Devices Object from a Schema Object. This is needed to create objects endpointables for Restivus API.
 * @class
 */
Devices.attachSchema(Schemas.Devices);
/**
 * @summary This is creating a Devices Object from a Schema Object. This is needed to create objects endpointables for Restivus API.
 * @class
 */
Modules.attachSchema(Schemas.Modules);
/**
 * @summary This is creating a Devices Object from a Schema Object. This is needed to create objects endpointables for Restivus API.
 * @class
 */
Plants.attachSchema(Schemas.Plants);
/**
 * @summary This is creating a Devices Object from a Schema Object. This is needed to create objects endpointables for Restivus API.
 * @class
 */
Stats.attachSchema(Schemas.Stats);

/**
 * @summary This is linking a Devices Object Schema to Restivus to generate the API with it.
 * @class
 */
Restivus.addCollection(Devices);
/**
 * @summary This is linking a Modules Object Schema to Restivus to generate the API with it.
 * @class
 */
Restivus.addCollection(Modules);
/**
 * @summary This is linking a Plants Object Schema to Restivus to generate the API with it.
 * @class
 */
Restivus.addCollection(Plants);
/**
 * @summary This is linking a Stats Object Schema to Restivus to generate the API with it.
 * @class
 */
Restivus.addCollection(Stats);
/**
 * @summary This is linking a Meteor.users Object Schema to Restivus to generate the API with it.
 * @class
 */
Restivus.addCollection(Meteor.users);