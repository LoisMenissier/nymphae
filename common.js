Devices = new Mongo.Collection('devices');
Modules = new Mongo.Collection('modules');
Plants = new Mongo.Collection('plants');
Stats = new Mongo.Collection('stats');

var Schemas = {};

Schemas.Devices = new SimpleSchema({
    macAdress: {
        type: String,
        label: "Mac Adress",
        max: 6
    },
    firstTime: {
        type: Boolean,
        label: "First Time"
    }
});

Schemas.Modules = new SimpleSchema({
    idDevice: {
        type: String,
        label: "Device's Id"
    },
    idPlant: {
        type: String,
        label: "Plant's Id"
    }
});

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


Devices.attachSchema(Schemas.Devices);
Modules.attachSchema(Schemas.Modules);
Plants.attachSchema(Schemas.Plants);
Stats.attachSchema(Schemas.Stats);

Restivus.addCollection(Devices);
Restivus.addCollection(Modules);
Restivus.addCollection(Plants);
Restivus.addCollection(Stats);