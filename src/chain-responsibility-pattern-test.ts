/*
Problem: This is an ATM, and it needs to check if the amount that the  person wants to withdraw from its account can be delivered in bills that the ATM has, which are: 20€, 50€ and 70€.
*/

class AbstractHandler {
  sucessor: AbstractHandler;

  setSuccessorHandler(sucessor: AbstractHandler): void {}

  processMultiple(ctx) {
    console.log(
      `The number ${ctx.getMultiple()} is neither a multiple of 20,50,70.`
    );
  }
}

class MultipleofTwentyHandler extends AbstractHandler {
  constructor() {
    super();
    this.sucessor = new AbstractHandler();
  }

  setSuccessorHandler(nextObj) {
    this.sucessor = nextObj;
  }

  processMultiple(ctx) {
    if (ctx.getMultiple() % 20 == 0) {
      console.log(`Multiple of 20: ${ctx.getMultiple()}`);
    } else {
      this.sucessor.processMultiple(ctx);
    }
  }
}

class MultipleofFiftyHandler extends AbstractHandler {
  constructor() {
    super();
    this.sucessor = new AbstractHandler();
  }

  setSuccessorHandler(nextObj) {
    this.sucessor = nextObj;
  }

  processMultiple(ctx) {
    if (ctx.getMultiple() % 50 == 0) {
      console.log(`Multiple of 50: ${ctx.getMultiple()}`);
    } else {
      this.sucessor.processMultiple(ctx);
    }
  }
}

class MultipleofSeventyHandler extends AbstractHandler {
  sucessor: AbstractHandler;

  constructor() {
    super();
    this.sucessor = new AbstractHandler();
  }

  setSuccessorHandler(nextObj) {
    this.sucessor = nextObj;
  }

  processMultiple(ctx) {
    if (ctx.getMultiple() % 70 == 0) {
      console.log(`Multiple of 70: ${ctx.getMultiple()}`);
    } else {
      this.sucessor.processMultiple(ctx);
    }
  }
}

// Does not relate with the chain of responsibilities
class Multiple {
  multiple: number;

  constructor(multiple) {
    this.multiple = multiple;
  }

  getMultiple() {
    return this.multiple;
  }
}

// Configuring the chain of responsibilities
var c1 = new MultipleofTwentyHandler();
var c2 = new MultipleofFiftyHandler();
var c3 = new MultipleofSeventyHandler();

// CHAIN: c1 => c2 => c3
c1.setSuccessorHandler(c2);
c2.setSuccessorHandler(c3);

// Examples
c1.processMultiple(new Multiple(60));
c1.processMultiple(new Multiple(150));
c1.processMultiple(new Multiple(210));
c1.processMultiple(new Multiple(230));
