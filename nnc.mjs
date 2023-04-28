#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const componentName = process.argv[2];

if (!componentName) {
  console.error(chalk.red("Error: Component name is required."));
  process.exit(1);
}

const componentPath = path.join(process.cwd(), componentName);

const createComponent = async () => {
  try {
    await fs.ensureDir(componentPath);

    const indexTsxContent = `import React from 'react';
import styles from './index.styles.module.scss';

const ${componentName} = () => {
  return (
    <div className={styles.${componentName}}>
      ${componentName}
    </div>
  );
};

export default ${componentName};
`;

    const indexScssContent = `.${componentName} {
  /* Your styles here */
}
`;

    await fs.writeFile(path.join(componentPath, "index.tsx"), indexTsxContent);
    await fs.writeFile(
      path.join(componentPath, "index.styles.module.scss"),
      indexScssContent
    );

    console.log(
      chalk.green(`Component ${componentName} created successfully.`)
    );
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

createComponent();
