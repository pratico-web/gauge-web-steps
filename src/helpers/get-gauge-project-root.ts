import * as shelljs from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';

export function getGaugeProjectRoot() {
  const result = shelljs.exec('npm prefix');
  if (result.code === 0) {
    const npmPrefixPath = result.stdout.substring(0, result.stdout.length - 1);
    if (npmPrefixPath.endsWith('/gauge-project')) {
      return npmPrefixPath;
    } else {
      if (fs.existsSync(path.join(npmPrefixPath, 'gauge'))) {
        return path.join(npmPrefixPath, 'gauge');
      } else {
        throw new Error('Could not determinate gauge project root');
      }
    }
  } else {
    throw new Error('Could not determinate gauge project root');
  }

}
