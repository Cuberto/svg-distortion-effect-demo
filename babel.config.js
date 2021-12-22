const presets = [
    [
        "@babel/preset-env",
        {
            "loose": true,
            "exclude": ["transform-async-to-generator", "transform-regenerator"]
        }
    ]
];

const plugins = [
    [
        "module:fast-async",
        {
            "spec": true
        }
    ]
];

module.exports = {presets, plugins, "sourceType": "unambiguous"};
