export function waitForAllAngular(callback: Function) {
  try {
    let testabilities = (<any>window).getAllAngularTestabilities();
    let count = testabilities.length;
    let decrement = () => {
      count--;
      if (count === 0) {
        callback();
      }
    };
    testabilities.forEach((testability: any) => {
      testability.whenStable(decrement);
    });
  } catch (err) {
    callback(err.message);
  }
};
