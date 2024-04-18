"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var axios_1 = require("axios");
var dotenv = require("dotenv");
var path = require("path");
var app = express();
dotenv.config();
var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_1, weatherData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                location_1 = req.query.location;
                weatherData = null;
                if (!location_1) return [3 /*break*/, 2];
                return [4 /*yield*/, getWeatherData(location_1)];
            case 1:
                weatherData = _a.sent();
                _a.label = 2;
            case 2:
                res.render('index', { weatherData: weatherData });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.render('error', { error: 'Error fetching weather data' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/weather', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_2, weatherData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                location_2 = req.body.location;
                return [4 /*yield*/, getWeatherData(location_2)];
            case 1:
                weatherData = _a.sent();
                res.render('index', { weatherData: weatherData });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.render('error', { error: 'Error fetching weather data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
function getWeatherData(location) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, geoResponse, _a, lat, lon, weatherResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    apiKey = process.env.APP_API_KEY;
                    return [4 /*yield*/, axios_1.default.get("http://api.openweathermap.org/geo/1.0/direct?q=".concat(location, "&limit=5&appid=").concat(apiKey))];
                case 1:
                    geoResponse = _b.sent();
                    _a = geoResponse.data[0], lat = _a.lat, lon = _a.lon;
                    return [4 /*yield*/, axios_1.default.get("https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(apiKey))];
                case 2:
                    weatherResponse = _b.sent();
                    return [2 /*return*/, weatherResponse.data];
            }
        });
    });
}
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
