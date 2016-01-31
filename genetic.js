"use strict";
class Genetic {
	constructor () {
		this.initial = [1,1,1,1];
		this.current = [this.initial];
		this.generation = 0;
		this.siblings = 10;
		this.mutationRate = 0.1;
		this.mutationAmount = 0.5;
	}
	
	generation () {
		return this.generation;
	}
	
	scores () {
		return this.current.map(val => ({
			score: Math.abs((val[0] * val[1] * val[2] * val[3]) - 200),
			value: val
		})).sort((a, b) => (a.score - b.score));
	}
	
	children () {
		let children = []
		if (this.generation === 0) {
			for (var i=0; i<this.siblings; i++) {
				children.push(this.mutateAll(this.initial));
			}
			
		} else {
			
			let best = this.scores().slice(0, 2);
			for (var i=0; i<this.siblings; i++) {
				let child = [];
				
				if (Math.random() > this.mutationRate) {
					child.push(best[+(Math.random() > 0.5)].value[0])
					child.push(best[+(Math.random() > 0.5)].value[1])
					child.push(best[+(Math.random() > 0.5)].value[2])
					child.push(best[+(Math.random() > 0.5)].value[3])
					children.push(child);
					
				} else {
					children.push(this.mutateAll(best[0].value));
					
				}
			}
			
		}
		
		this.current = children;
		this.generation++;
		return this;
	}
	
	run (threshold) {
		
		while (true) {
			let scores = this.scores();
			// console.log(scores);
			if (scores[0].score < threshold) break;
			
			console.log("generation " + this.generation + " - score: " + scores[0].score + " - best: " + scores[0].value);
			this.children();
		}
		
		return this.scores()[0];
	}
	
	mutateAll (vals) {
		return vals.map((val) => {
			return Genetic.randomNumber(val - (val * this.mutationAmount), val + (val * this.mutationAmount), false);
		});
	}
	
}

Genetic.randomNumber = function (lower, upper, integer) {
	let num = lower + Math.random() * (Math.max(lower, upper) - Math.min(upper, lower));
	num = integer ? Math.round(num) : num;
	return num;
}

let alg = new Genetic();

console.log(alg.run(0.01));
