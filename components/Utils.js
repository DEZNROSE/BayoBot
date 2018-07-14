"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeString = (time, num) => (time % num < 10) ? '0' + time % num : `${time % num}`;
exports.formatUpTimeString = (time) => (time < 10) ? '0' + time : `${time}`;
exports.secondsToStandardTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const timeString = `${exports.formatTimeString(hours, 24)}:
    ${exports.formatTimeString(minutes, 60)}:${exports.formatTimeString(seconds, 60)}`
        .replace(/\n/g, "");
    return timeString;
};
exports.secondsToUpTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const timeString = `${exports.formatUpTimeString(hours)} Hours, 
  ${exports.formatTimeString(minutes, 60)}:${exports.formatTimeString(seconds, 60)}`
        .replace(/\n/g, "");
    return timeString;
};
function capitalize(string) {
    const copy = string.slice();
    return copy.charAt(0).toUpperCase() + copy.slice(1);
}
exports.capitalize = capitalize;
function clamp(min, max) {
    return Math.min(Math.max(min), max);
}
exports.clamp = clamp;
function replaceText(re, replaceText) {
    return (text) => {
        return text.replace(re, replaceText);
    };
}
exports.replaceText = replaceText;
function prettify(data) {
    return JSON.stringify(data, null, 2);
}
exports.prettify = prettify;
function removeLineBreak(string) {
    return string.replace(/\\n\\r|\n/ig, "").replace(/\s{2,}/gi, " ");
}
exports.removeLineBreak = removeLineBreak;
//# sourceMappingURL=Utils.js.map