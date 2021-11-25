export async function getPkgJsonDir() {
  const { dirname } = require('path');
  const {
    constants,
    promises: { access },
  } = require('fs');

  for (const path of module.paths) {
    try {
      const prospectivePkgJsonDir = dirname(path);
      await access(path, constants.F_OK);
      return prospectivePkgJsonDir;
    } catch (e) {}
  }
}
