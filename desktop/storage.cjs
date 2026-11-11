"use strict";
/* Saves as plain JSON files in one folder, so Steam Auto-Cloud can sync it.
   Writes are atomic and keep the previous copy; a torn or corrupt file falls
   back to that copy instead of losing the line. */
const fs = require("node:fs");
const path = require("node:path");

const KEY = /^[a-z0-9][a-z0-9._-]{0,63}$/;

function createStore(dir) {
  fs.mkdirSync(dir, { recursive: true });

  const file = (key) => {
    if (typeof key !== "string" || !KEY.test(key)) throw new Error(`bad save key: ${key}`);
    return path.join(dir, `${key}.json`);
  };

  const readValid = (target) => {
    try {
      const raw = fs.readFileSync(target, "utf8");
      JSON.parse(raw);
      return raw;
    } catch {
      return null;
    }
  };

  return {
    dir,
    /** The stored JSON text, the last good copy if the newest is damaged, or null. */
    read(key) {
      const target = file(key);
      return readValid(target) ?? readValid(`${target}.bak`);
    },
    /** Returns true when the value is on disk. Refuses anything that is not JSON. */
    write(key, value) {
      const target = file(key);
      try {
        JSON.parse(value);
      } catch {
        return false;
      }
      try {
        if (readValid(target) !== null) fs.copyFileSync(target, `${target}.bak`);
        const tmp = `${target}.${process.pid}.tmp`;
        const fd = fs.openSync(tmp, "w");
        try {
          fs.writeFileSync(fd, value, "utf8");
          fs.fsyncSync(fd);
        } finally {
          fs.closeSync(fd);
        }
        fs.renameSync(tmp, target);
        return true;
      } catch {
        return false;
      }
    },
  };
}

module.exports = { createStore };
