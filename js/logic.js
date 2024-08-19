function rollgeno() {
	//GENORATOR VERSION 1.8

	// CHANGELOG
	// beta = old script layout, no agouti etc.
	// 1.0 = partial agouti, KIT, etc.
	// 1.1 = optimized layout
	// 1.2 = chimera implementation
	// 1.3 = chimera fixed, false-postive fixed
	// 1.4 = valorteen update
	// 1.5 = agouti update
	// 1.6 = pheno reader, multi offspring
	// 1.7 = stat system
	// 1.8 = iterative gene handling

	document.getElementById('puppy-container').innerHTML = '';

	//puppy
	var puppy = [];
	var pheno = [];
	var type = '';
	var puppydeath = 0;

	//parents
	var sireget = document.getElementById('sireget').value;
	var ssplitfix = sireget.replace(/\//g, ' ');
	var ssplit = ssplitfix;

	var damget = document.getElementById('damget').value;
	var dsplitfix = damget.replace(/\//g, ' ');
	var dsplit = dsplitfix;

	function roller(x) {
		var roll = Math.floor(Math.random() * x) + 1;
		return roll;
	}

	function rollcoat() {
		function basecoat() {
			dictionary.bases.forEach((base) => {
				let regex = new RegExp(`\\b(${base[1].join('|')})(${base[1].join('|')})\\b`, 'i');

				if (ssplit.search(regex) === -1 && dsplit.search(regex) === -1) {
					return;
				}

				let regexFirst = new RegExp(`\\b(${base[1].join('|')})(?=(${base[1].join('|')}))`, 'i');
				let regexSecond = new RegExp(`(?<=(${base[1].join('|')}))(${base[1].join('|')})\\b`, 'i');
				let s1 = ssplit.match(regexFirst);
				let s2 = ssplit.match(regexSecond);
				let d1 = dsplit.match(regexFirst);
				let d2 = dsplit.match(regexSecond);

				let a = [s1[0], d1[0]].sortByArray(base[1]).join('');
				let b = [s1[0], d2[0]].sortByArray(base[1]).join('');
				let c = [s2[0], d1[0]].sortByArray(base[1]).join('');
				let d = [s2[0], d2[0]].sortByArray(base[1]).join('');
				console.log(a, b, c, d);

				puppy.push(randomizer([a, b, c, d]));
			});
		}
		basecoat();

		function coat() {
			//bodystripes
			var csbodystripes = ssplit.search(
				/\b(Stb|sth|stl|str)(Stb|sth|stl|str)\b/,
			);
			var cdbodystripes = dsplit.search(
				/\b(Stb|sth|stl|str)(Stb|sth|stl|str)\b/,
			);

			function rollbodystripes() {
				var s1 = ssplit.match(
					/\b(Stb|sth|stl|str)(?=Stb|sth|stl|str)/,
				);
				var s2 = ssplit.match(
					/(?<=Stb|sth|stl|str)(Stb|sth|stl|str)\b/,
				);
				var d1 = dsplit.match(
					/\b(Stb|sth|stl|str)(?=Stb|sth|stl|str)/,
				);
				var d2 = dsplit.match(
					/(?<=Stb|sth|stl|str)(Stb|sth|stl|str)\b/,
				);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Stb', 'sth', 'stl', 'str'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csbodystripes != -1 && cdbodystripes != -1) {
				rollbodystripes();
			} else {
				puppy.push('??');
			}

			//legstripes
			var cslegstripes = ssplit.search(
				/\b(Ltb|lth|ltl|ltr)(Ltb|lth|ltl|ltr)\b/,
			);
			var cdlegstripes = dsplit.search(
				/\b(Ltb|lth|ltl|ltr)(Ltb|lth|ltl|ltr)\b/,
			);

			function rolllegstripes() {
				var s1 = ssplit.match(
					/\b(Ltb|lth|ltl|ltr)(?=Ltb|lth|ltl|ltr)/,
				);
				var s2 = ssplit.match(
					/(?<=Ltb|lth|ltl|ltr)(Ltb|lth|ltl|ltr)\b/,
				);
				var d1 = dsplit.match(
					/\b(Ltb|lth|ltl|ltr)(?=Ltb|lth|ltl|ltr)/,
				);
				var d2 = dsplit.match(
					/(?<=Ltb|lth|ltl|ltr)(Ltb|lth|ltl|ltr)\b/,
				);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Ltb', 'lth', 'ltl', 'ltr'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cslegstripes != -1 && cdlegstripes != -1) {
				rolllegstripes();
			} else {
				puppy.push('??');
			}

			//spinalstripes
			var csspinalstripes = ssplit.search(
				/\b(Pt|pts|ptb)(Pt|pts|ptb)\b/,
			);
			var cdspinalstripes = dsplit.search(
				/\b(Pt|pts|ptb)(Pt|pts|ptb)\b/,
			);

			function rollspinalstripes() {
				var s1 = ssplit.match(/\b(Pt|pts|ptb)(?=Pt|pts|ptb)/);
				var s2 = ssplit.match(/(?<=Pt|pts|ptb)(Pt|pts|ptb)\b/);
				var d1 = dsplit.match(/\b(Pt|pts|ptb)(?=Pt|pts|ptb)/);
				var d2 = dsplit.match(/(?<=Pt|pts|ptb)(Pt|pts|ptb)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Pt', 'pts', 'ptb'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csspinalstripes != -1 && cdspinalstripes != -1) {
				rollspinalstripes();
			} else {
				puppy.push('??');
			}

			//blackspotting
			var csblackspotting = ssplit.search(
				/\b(Bs|bsk|bss|bsi|bsc)(Bs|bsk|bss|bsi|bsc)\b/,
			);
			var cdblackspotting = dsplit.search(
				/\b(Bs|bsk|bss|bsi|bsc)(Bs|bsk|bss|bsi|bsc)\b/,
			);

			function rollblackspotting() {
				var s1 = ssplit.match(
					/\b(Bs|bsk|bss|bsi|bsc)(?=Bs|bsk|bss|bsi|bsc)/,
				);
				var s2 = ssplit.match(
					/(?<=Bs|bsk|bss|bsi|bsc)(Bs|bsk|bss|bsi|bsc)\b/,
				);
				var d1 = dsplit.match(
					/\b(Bs|bsk|bss|bsi|bsc)(?=Bs|bsk|bss|bsi|bsc)/,
				);
				var d2 = dsplit.match(
					/(?<=Bs|bsk|bss|bsi|bsc)(Bs|bsk|bss|bsi|bsc)\b/,
				);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Bs', 'bsk', 'bss', 'bsi', 'bsc'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csblackspotting != -1 && cdblackspotting != -1) {
				rollblackspotting();
			} else {
				puppy.push('??');
			}

			//blackpoints
			var csblackpoints = ssplit.search(/\b(Bp|bp)(Bp|bp)\b/);
			var cdblackpoints = dsplit.search(/\b(Bp|bp)(Bp|bp)\b/);

			function rollblackpoints() {
				var s1 = ssplit.match(/\b(Bp|bp)(?=Bp|bp)/);
				var s2 = ssplit.match(/(?<=Bp|bp)(Bp|bp)\b/);
				var d1 = dsplit.match(/\b(Bp|bp)(?=Bp|bp)/);
				var d2 = dsplit.match(/(?<=Bp|bp)(Bp|bp)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Bp', 'bp'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csblackpoints != -1 && cdblackpoints != -1) {
				rollblackpoints();
			} else {
				puppy.push('??');
			}

			//blackmask
			var csblackmask = ssplit.search(/\b(Bm|bm)(Bm|bm)\b/);
			var cdblackmask = dsplit.search(/\b(Bm|bm)(Bm|bm)\b/);

			function rollblackmask() {
				var s1 = ssplit.match(/\b(Bm|bm)(?=Bm|bm)/);
				var s2 = ssplit.match(/(?<=Bm|bm)(Bm|bm)\b/);
				var d1 = dsplit.match(/\b(Bm|bm)(?=Bm|bm)/);
				var d2 = dsplit.match(/(?<=Bm|bm)(Bm|bm)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Bm', 'bm'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csblackmask != -1 && cdblackmask != -1) {
				rollblackmask();
			} else {
				puppy.push('??');
			}

			// // dorsalstrip / dorsaldun
			// const csdorsal = ssplit.search(/\b(Bd|bd|bdd)(Bd|bd|bdd)\b/);
			// const cddorsal = dsplit.search(/\b(Bd|bd|bdd)(Bd|bd|bdd)\b/);

			// function rolldorsal() {

			// }

			// OLD DORSALSTRIP
			//dorsalstrip
			var csdorsalstrip = ssplit.search(/\b(Bd|bd|bdd)(Bd|bd|bdd)\b/);
			var cddorsalstrip = dsplit.search(/\b(Bd|bd|bdd)(Bd|bd|bdd)\b/);

			function rolldorsalstrip() {
				var s1 = ssplit.match(/\b(Bd|bd|bdd)(?=Bd|bd|bdd)/);
				var s2 = ssplit.match(/(?<=Bd|bd|bdd)(Bd|bd|bdd)\b/);
				var d1 = dsplit.match(/\b(Bd|bd|bdd)(?=Bd|bd|bdd)/);
				var d2 = dsplit.match(/(?<=Bd|bd|bdd)(Bd|bd|bdd)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Bd', 'bd', 'bdd'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csdorsalstrip != -1 && cddorsalstrip != -1) {
				rolldorsalstrip();
			} else {
				puppy.push('??');
			}

			
			//frosting
			var csfrosting = ssplit.search(/\b(F|f)(F|f)\b/);
			var cdfrosting = dsplit.search(/\b(F|f)(F|f)\b/);

			function rollfrosting() {
				var s1 = ssplit.match(/\b(F|f)(?=F|f)/);
				var s2 = ssplit.match(/(?<=F|f)(F|f)\b/);
				var d1 = dsplit.match(/\b(F|f)(?=F|f)/);
				var d2 = dsplit.match(/(?<=F|f)(F|f)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['F', 'f'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csfrosting != -1 && cdfrosting != -1) {
				rollfrosting();
			} else {
				puppy.push('??');
			}

			//saddleback
			var cssaddleback = ssplit.search(/\b(Sdl|sdl)(Sdl|sdl)\b/);
			var cdsaddleback = dsplit.search(/\b(Sdl|sdl)(Sdl|sdl)\b/);

			function rollsaddleback() {
				var s1 = ssplit.match(/\b(Sdl|sdl)(?=Sdl|sdl)/);
				var s2 = ssplit.match(/(?<=Sdl|sdl)(Sdl|sdl)\b/);
				var d1 = dsplit.match(/\b(Sdl|sdl)(?=Sdl|sdl)/);
				var d2 = dsplit.match(/(?<=Sdl|sdl)(Sdl|sdl)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Sdl', 'sdl'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cssaddleback != -1 && cdsaddleback != -1) {
				rollsaddleback();
			} else {
				puppy.push('??');
			}

			//jackalback
			var csjackalback = ssplit.search(/\b(Jbk|jbk)(Jbk|jbk)\b/);
			var cdjackalback = dsplit.search(/\b(Jbk|jbk)(Jbk|jbk)\b/);

			function rolljackalback() {
				var s1 = ssplit.match(/\b(Jbk|jbk)(?=Jbk|jbk)/);
				var s2 = ssplit.match(/(?<=Jbk|jbk)(Jbk|jbk)\b/);
				var d1 = dsplit.match(/\b(Jbk|jbk)(?=Jbk|jbk)/);
				var d2 = dsplit.match(/(?<=Jbk|jbk)(Jbk|jbk)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Jbk', 'jbk'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csjackalback != -1 && cdjackalback != -1) {
				rolljackalback();
			} else {
				puppy.push('??');
			}


			//urajiro
			var csurajiro = ssplit.search(/\b(U|utgr|u)(U|utgr|u)\b/);
			var cdurajiro = dsplit.search(/\b(U|utgr|u)(U|utgr|u)\b/);

			function rollurajiro() {
				var s1 = ssplit.match(/\b(U|utgr|u)(?=U|utgr|u)/);
				var s2 = ssplit.match(/(?<=U|utgr|u)(U|utgr|u)\b/);
				var d1 = dsplit.match(/\b(U|utgr|u)(?=U|utgr|u)/);
				var d2 = dsplit.match(/(?<=U|utgr|u)(U|utgr|u)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['U', 'utgr', 'u'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csurajiro != -1 && cdurajiro != -1) {
				rollurajiro();
			} else {
				puppy.push('??');
			}

			//whitespotting
			var cswhitespotting = ssplit.search(/\b(S|si|sp)(S|si|sp)\b/);
			var cdwhitespotting = dsplit.search(/\b(S|si|sp)(S|si|sp)\b/);

			function rollwhitespotting() {
				var s1 = ssplit.match(/\b(S|si|sp)(?=S|si|sp)/);
				var s2 = ssplit.match(/(?<=S|si|sp)(S|si|sp)\b/);
				var d1 = dsplit.match(/\b(S|si|sp)(?=S|si|sp)/);
				var d2 = dsplit.match(/(?<=S|si|sp)(S|si|sp)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['S', 'si', 'sp'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cswhitespotting != -1 && cdwhitespotting != -1) {
				rollwhitespotting();
			} else {
				puppy.push('??');
			}

			//eyeshade
			var cseyeshade = ssplit.search(/\b(Ec|ec)(Ec|ec)\b/);
			var cdeyeshade = dsplit.search(/\b(Ec|ec)(Ec|ec)\b/);

			function rolleyeshade() {
				var s1 = ssplit.match(/\b(Ec|ec)(?=Ec|ec)/);
				var s2 = ssplit.match(/(?<=Ec|ec)(Ec|ec)\b/);
				var d1 = dsplit.match(/\b(Ec|ec)(?=Ec|ec)/);
				var d2 = dsplit.match(/(?<=Ec|ec)(Ec|ec)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Ec', 'ec'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cseyeshade != -1 && cdeyeshade != -1) {
				rolleyeshade();
			} else {
				puppy.push('??');
			}

			//eyechromia
			var cseyechromia = ssplit.search(/\b(Ex|exw|ex)(Ex|exw|ex)\b/);
			var cdeyechromia = dsplit.search(/\b(Ex|exw|ex)(Ex|exw|ex)\b/);

			function rolleyechromia() {
				var s1 = ssplit.match(/\b(Ex|exw|ex)(?=Ex|exw|ex)/);
				var s2 = ssplit.match(/(?<=Ex|exw|ex)(Ex|exw|ex)\b/);
				var d1 = dsplit.match(/\b(Ex|exw|ex)(?=Ex|exw|ex)/);
				var d2 = dsplit.match(/(?<=Ex|exw|ex)(Ex|exw|ex)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Ex', 'exw', 'ex'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cseyechromia != -1 && cdeyechromia != -1) {
				rolleyechromia();
			} else {
				puppy.push('??');
			}

			//nosepigment
			var csnosepigment = ssplit.search(/\b(N|n)(N|n)\b/);
			var cdnosepigment = dsplit.search(/\b(N|n)(N|n)\b/);

			function rollnosepigment() {
				var s1 = ssplit.match(/\b(N|n)(?=N|n)/);
				var s2 = ssplit.match(/(?<=N|n)(N|n)\b/);
				var d1 = dsplit.match(/\b(N|n)(?=N|n)/);
				var d2 = dsplit.match(/(?<=N|n)(N|n)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['N', 'n'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (csnosepigment != -1 && cdnosepigment != -1) {
				rollnosepigment();
			} else {
				puppy.push('??');
			}

			//coatlength
			var cscoatlength = ssplit.search(/\b(Cts|ctm)(Cts|ctm)\b/);
			var cdcoatlength = dsplit.search(/\b(Cts|ctm)(Cts|ctm)\b/);

			function rollcoatlength() {
				var s1 = ssplit.match(/\b(Cts|ctm)(?=Cts|ctm)/);
				var s2 = ssplit.match(/(?<=Cts|ctm)(Cts|ctm)\b/);
				var d1 = dsplit.match(/\b(Cts|ctm)(?=Cts|ctm)/);
				var d2 = dsplit.match(/(?<=Cts|ctm)(Cts|ctm)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Cts', 'ctm'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cscoatlength != -1 && cdcoatlength != -1) {
				rollcoatlength();
			} else {
				puppy.push('??');
			}

			//crestvariety
			var cscrestvariety = ssplit.search(/\b(Rg|rg)(Rg|rg)\b/);
			var cdcrestvariety = dsplit.search(/\b(Rg|rg)(Rg|rg)\b/);

			function rollcrestvariety() {
				var s1 = ssplit.match(/\b(Rg|rg)(?=Rg|rg)/);
				var s2 = ssplit.match(/(?<=Rg|rg)(Rg|rg)\b/);
				var d1 = dsplit.match(/\b(Rg|rg)(?=Rg|rg)/);
				var d2 = dsplit.match(/(?<=Rg|rg)(Rg|rg)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Rg', 'rg'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cscrestvariety != -1 && cdcrestvariety != -1) {
				rollcrestvariety();
			} else {
				puppy.push('??');
			}

			//tailshape
			var cstailshape = ssplit.search(
				/\b(Tlt|tlp|tls|tla)(Tlt|tlp|tls|tla)\b/,
			);
			var cdtailshape = dsplit.search(
				/\b(Tlt|tlp|tls|tla)(Tlt|tlp|tls|tla)\b/,
			);

			function rolltailshape() {
				var s1 = ssplit.match(
					/\b(Tlt|tlp|tls|tla)(?=Tlt|tlp|tls|tla)/,
				);
				var s2 = ssplit.match(
					/(?<=Tlt|tlp|tls|tla)(Tlt|tlp|tls|tla)\b/,
				);
				var d1 = dsplit.match(
					/\b(Tlt|tlp|tls|tla)(?=Tlt|tlp|tls|tla)/,
				);
				var d2 = dsplit.match(
					/(?<=Tlt|tlp|tls|tla)(Tlt|tlp|tls|tla)\b/,
				);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['Tlt', 'tlp', 'tls', 'tla'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cstailshape != -1 && cdtailshape != -1) {
				rolltailshape();
			} else {
				puppy.push('??');
			}

			//littersize
			var cslittersize = ssplit.search(/\b(L|l)(L|l)\b/);
			var cdlittersize = dsplit.search(/\b(L|l)(L|l)\b/);

			function rolllittersize() {
				var s1 = ssplit.match(/\b(L|l)(?=L|l)/);
				var s2 = ssplit.match(/(?<=L|l)(L|l)\b/);
				var d1 = dsplit.match(/\b(L|l)(?=L|l)/);
				var d2 = dsplit.match(/(?<=L|l)(L|l)\b/);

				var a = [s1[1], d1[1]];
				var b = [s1[1], d2[1]];
				var c = [s2[1], d1[1]];
				var d = [s2[1], d2[1]];

				var random = [a, b, c, d];
				var random = random[Math.floor(Math.random() * 4)];
				var sortOrder = ['L', 'l'];
				random.sort(function (a, b) {
					return sortOrder.indexOf(a) - sortOrder.indexOf(b);
				});
				var random = random.join('');
				puppy.push(random);
			}

			if (cslittersize != -1 && cdlittersize != -1) {
				rolllittersize();
			} else {
				puppy.push('??');
			}
		}
		// coat();
	} // end rollcoat();

	function phenoreader() {
		pheno = [' '];

		var tffix = puppy.toString();
		var tffix = tffix.replace(/,\+,/g, ' + ');
		var tffix = tffix.replace(/,/, '');
		var tffix = tffix.replace(/,/g, ' ');
		var tffix = tffix.trim();
		var temppuppy = tffix;

		function phenobasecoat() {
			function normalbase() {
				if (temppuppy.search(/\b(ZZ|Zz)\b/) != -1) {
					if (
						temppuppy.search(
							/\b(YdYd|Ydya|Ydys|Ydyg|Ydyb|Ydyc)\b/,
						) != -1
					) {
						pheno.push('Dark Yellow');
					} else if (
						temppuppy.search(
							/\b(yaya|yays|yayg|yayb|yayc)\b/,
						) != -1
					) {
						pheno.push('Ash Yellow');
					} else if (
						temppuppy.search(/\b(ysys|ysyg|ysyb|ysyc)\b/) !=
						-1
					) {
						pheno.push('Sunset Yellow');
					} else if (
						temppuppy.search(/\b(ygyg|ygyb|ygyc)\b/) != -1
					) {
						pheno.push('Golden Yellow');
					} else if (temppuppy.search(/\b(ybyb|ybyc)\b/) != -1) {
						pheno.push('Bright Yellow');
					} else if (temppuppy.search(/\b(ycyc)\b/) != -1) {
						pheno.push('Cream Yellow');
					} else {
						pheno.push('Yellow error');
					}
				} else if (temppuppy.search(/\b(zz)\b/) != -1) {
					if (
						temppuppy.search(
							/\b(DncDnc|Dncdna|Dncdnt|Dncdnd|Dncdnl|Dncdns)\b/,
						) != -1
					) {
						pheno.push('Chestnut Dune');
					} else if (
						temppuppy.search(
							/\b(dnadna|dnadnt|dnadnd|dnadnl|dnadns)\b/,
						) != -1
					) {
						pheno.push('Dark Dune');
					} else if (
						temppuppy.search(
							/\b(dntdnt|dntdnd|dntdnl|dntdns)\b/,
						) != -1
					) {
						pheno.push('Terracotta Dune');
					} else if (
						temppuppy.search(/\b(dnddnd|dnddnl|dnddns)\b/) !=
						-1
					) {
						pheno.push('Dune');
					} else if (
						temppuppy.search(/\b(dnldnl|dnldns)\b/) != -1
					) {
						pheno.push('Light Dune');
					} else if (temppuppy.search(/\b(dnsdns)\b/) != -1) {
						pheno.push('Sand Dune');
					}
				} else {
					pheno.push('Z error');
				}
			} // normalbase();

			//   console.log(temppuppy);
			if (temppuppy.search(/\b(DD|Dd|Ddi)\b/) != -1) {
				// console.log("no dilute");
			} else if (temppuppy.search(/\b(dd)\b/) != -1) {
				pheno.push('Dilute');
			} else if (temppuppy.search(/\b(ddi)\b/) != -1) {
				pheno.push('Double Dilute');
			} else if (temppuppy.search(/\b(didi)\b/) != -1) {
				//   console.log('yas');
				pheno.push('Lethal White');
			} else {
				console.log('Dilute error');
			}

			if (temppuppy.search(/\b(MxMx|Mxmxx|Mxmxd)\b/) != -1) {
				normalbase();
			} else if (temppuppy.search(/\b(mxxmxx)\b/) != -1) {
				var x = roller(100);
				if (x <= 75) {
					normalbase();
				} else if (x >= 75) {
					if (temppuppy.search(/\b(ZZ|Zz)\b/) != -1) {
						pheno.push('Hazel Yellow');
						pheno.push('(');
						normalbase();
						pheno.push(')');
					} else if (temppuppy.search(/\b(zz)\b/) != -1) {
						pheno.push('Seal Dune');
						pheno.push('(');
						normalbase();
						pheno.push(')');
					}
				}
			} else if (temppuppy.search(/\b(mxdmxd)\b/) != -1) {
				var x = roller(100);
				if (x <= 75) {
					normalbase();
				} else if (x >= 75) {
					if (temppuppy.search(/\b(ZZ|Zz)\b/) != -1) {
						pheno.push('Yellow Dusk');
					} else if (temppuppy.search(/\b(zz)\b/) != -1) {
						pheno.push('Dusk Dune');
					}
				}
			} else if (temppuppy.search(/\b(mxxmxd)\b/) != -1) {
				var x = roller(100);
				if (x <= 85) {
					normalbase();
				} else if (x >= 85) {
					if (temppuppy.search(/\b(ZZ|Zz)\b/) != -1) {
						pheno.push('Hazel Yellow');
						pheno.push('(');
						normalbase();
						pheno.push(')');
					} else if (temppuppy.search(/\b(zz)\b/) != -1) {
						pheno.push('Seal Dune');
						pheno.push('(');
						normalbase();
						pheno.push(')');
					}
				}
			} else {
				console.log('Mixed error');
			}

			if (temppuppy.search(/\b(SS)\b/) != -1) {
				pheno.push('Bicolor');
			} else if (
				temppuppy.search(/\b(Ssi|Ssp|sisi|sisp|spsp)\b/) != -1
			) {
				pheno.push('Tricolor');
			}
		}
		phenobasecoat();

		pheno.push('with');

		function phenomarkings() {
			if (temppuppy.search(/(StbStb)/) != -1) {
				pheno.push('Solid Inverse Body Stripes.');
			} else if (temppuppy.search(/(Stbsth)/) != -1) {
				pheno.push('Light Inverse Body Stripes.');
			} else if (temppuppy.search(/(Stbstl)/) != -1) {
				pheno.push('Medium Inverse Body Stripes.');
			} else if (temppuppy.search(/(Stbstr)/) != -1) {
				pheno.push('Heavy Inverse Body Stripes.');
			} else if (temppuppy.search(/(sthsth)/) != -1) {
				pheno.push('Heavy Body Stripes.');
			} else if (temppuppy.search(/(sthstl|sthstr)/) != -1) {
				pheno.push('Medium Body Stripes.');
			} else if (temppuppy.search(/(stlstl|stlstr)/) != -1) {
				pheno.push('Light Body Stripes.');
			} else if (temppuppy.search(/(strstr)/) != -1) {
				pheno.push('Restricted Body Stripes.');
			} else {
				pheno.push('bodystripes Error.');
			}

			if (temppuppy.search(/(LtbLtb)/) != -1) {
				pheno.push('Solid Inverse Leg Stripes.');
			} else if (temppuppy.search(/(Ltblth)/) != -1) {
				pheno.push('Light Inverse Leg Stripes.');
			} else if (temppuppy.search(/(Ltbltl)/) != -1) {
				pheno.push('Medium Inverse Leg Stripes.');
			} else if (temppuppy.search(/(Ltbltr)/) != -1) {
				pheno.push('Heavy Inverse Leg Stripes.');
			} else if (temppuppy.search(/(lthlth)/) != -1) {
				pheno.push('Heavy Leg Stripes.');
			} else if (temppuppy.search(/(lthltl|lthltr)/) != -1) {
				pheno.push('Medium Leg Stripes.');
			} else if (temppuppy.search(/(ltlltl|ltlltr)/) != -1) {
				pheno.push('Light Leg Stripes.');
			} else if (temppuppy.search(/(ltrltr)/) != -1) {
				pheno.push('Restricted Leg Stripes.');
			} else {
				pheno.push('legstripes Error.');
			}

			if (temppuppy.search(/(PtPt|Ptpts|Ptptb)/) != -1) {
				// console.log("no spinal stripes");
			} else if (temppuppy.search(/(ptspts|ptsptb)/) != -1) {
				pheno.push('Spinal Stripes.');
			} else if (temppuppy.search(/(ptbptb)/) != -1) {
				pheno.push('Blanket Stripes.');
			} else {
				pheno.push('spinalstripes Error');
			}

			if (temppuppy.search(/(BsBs|Bsbsk|Bsbss|Bsbsi|Bsbsc)/) != -1) {
				// console.log("no black spotting");
			} else if (
				temppuppy.search(/(bskbsk|bskbss|bskbsi|bskbsc)/) != -1
			) {
				pheno.push('Black Socks.');
			} else if (temppuppy.search(/(bssbss|bssbsi|bssbsc)/) != -1) {
				pheno.push('Black Spotting.');
			} else if (temppuppy.search(/(bsibsi|bsibsc)/) != -1) {
				pheno.push('Black Irish.');
			} else if (temppuppy.search(/(bscbsc)/) != -1) {
				pheno.push('Black Collared Irish.');
			} else {
				pheno.push('blackspotting Error');
			}

			if (temppuppy.search(/(BpBp|Bpbp)/) != -1) {
				// console.log("no black points");
			} else if (temppuppy.search(/(bpbp)/) != -1) {
				pheno.push('Black Points.');
			} else {
				pheno.push('blackpoints Error');
			}

			if (temppuppy.search(/(BmBm|Bmbm)/) != -1) {
				pheno.push('Black Mask.');
			} else if (temppuppy.search(/(bmbm)/) != -1) {
				// console.log("no black mask");
			} else {
				pheno.push('blackmask Error');
			}

			if (temppuppy.search(/(BdBd|Bdbd|Bdbdd)/) != -1) {
				pheno.push('Dorsal Strip.');
			} else if (temppuppy.search(/(bddbdd)/) != -1) {
				pheno.push('Dorsal Dun.');
			} else if (temppuppy.search(/(bdbd)/) != -1) {
				// console.log("no dorsal strip");
			} else {
				pheno.push('dorsalstrip Error');
			}

			if (temppuppy.search(/(SdlSdl|Sdlsdl)/) != -1) {
				// console.log("no saddleback");
			} else if (
				temppuppy.search(/(sdlsdl)/) != -1 &&
				ssplit.search(/(sdlsdl)/) != -1 &&
				dsplit.search(/(sdlsdl)/) != -1
			) {
				var x = roller(100);
				if (x <= 25) {
					pheno.push('Blanket Saddle.');
				} else if (x >= 26) {
					pheno.push('Saddleback.');
				}
			} else if (temppuppy.search(/(sdlsdl)/) != -1) {
				pheno.push('Saddleback.');
			} else {
				pheno.push('saddleback Error');
			}

			if (temppuppy.search(/(JbkJbk|Jbkjbk)/) != -1) {
				// console.log("no jackalback");
			} else if (temppuppy.search(/(jbkjbk)/) != -1) {
				pheno.push('Jackalback.');
			} else {
				pheno.push('jackalback Error');
			}

			if (temppuppy.search(/(FF|Ff)/) != -1) {
				// console.log("no frosting");
			} else if (
				(temppuppy.search(/(ff)/) != -1 &&
					temppuppy.search(/(sdlsdl)/) != -1) ||
				(temppuppy.search(/(ff)/) != -1 &&
					temppuppy.search(/(jbkjbk)/) != -1)
			) {
				pheno.push('Frosting.');
			} else if (temppuppy.search(/(ff)/) != -1) {
				pheno.push('(Frosting carrier).');
			} else {
				pheno.push('frosting Error');
			}

			if (temppuppy.search(/\b(UU|Uu)\b/) != -1) {
				// console.log("no urajiro");
			} 
			else if (temppuppy.search(/(Uutgr)/) != -1) {
				console.log('yas');
				pheno.push('Tiger Urajiro (Minimal).');
			} 
			else if (temppuppy.search(/(utgrutgr|utgru)/) != -1) {
				pheno.push('Tiger Urajiro.');
			} 
			else if (temppuppy.search(/(uu)/) != -1) {
				pheno.push('Normal Urajiro.');
			} 
			else {
				pheno.push('urajiro Error');
			}

			if (temppuppy.search(/(SS)/) != -1) {
				// console.log("no urajiro");
			} else if (temppuppy.search(/(Ssi|Ssp)/) != -1) {
				pheno.push('White Spotting.');
			} else if (temppuppy.search(/(sisi)/) != -1) {
				pheno.push('White Irish.');
			} else if (temppuppy.search(/(sisp)/) != -1) {
				pheno.push('White Collared Irish.');
			} else if (temppuppy.search(/(spsp)/) != -1) {
				pheno.push('Piebald White.');
			} else {
				pheno.push('whitespotting Error');
			}

			if (temppuppy.search(/(EcEc)/) != -1) {
				pheno.push('Dark Blue Eyes.');
			} else if (temppuppy.search(/(Ecec)/) != -1) {
				pheno.push('Medium Blue Eyes.');
			} else if (temppuppy.search(/(ecec)/) != -1) {
				pheno.push('Light Blue Eyes.');
			} else {
				pheno.push('eyeshade Error');
			}

			if (temppuppy.search(/(ExEx|Exexw|Exex)/) != -1) {
				pheno.push('Wadjet Eyes (Even).');
			} else if (temppuppy.search(/(exwexw|exwex)/) != -1) {
				pheno.push('Uto Eyes (Split).');
			} else if (temppuppy.search(/(exex)/) != -1) {
				pheno.push('Horus Eyes (Odd).');
			} else {
				pheno.push('eyechromia Error');
			}

			if (temppuppy.search(/(NN)/) != -1) {
				// console.log("solid nose");
			} else if (temppuppy.search(/(Nn)/) != -1) {
				pheno.push('Butterfly Nose.');
			} else if (temppuppy.search(/(nn)/) != -1) {
				pheno.push('Dudley Nose.');
			} else {
				pheno.push('nosepigment Error');
			}

			if (temppuppy.search(/(CtsCts)/) != -1) {
				// console.log("Smooth Coat");
			}
			else if (temppuppy.search(/(Ctsctm)/) != -1) {
				pheno.push('Feathered Coat.');
			}
			else if (temppuppy.search(/(ctmctm)/) != -1) {
				pheno.push('Primative Coat.');
			}
			else {
				pheno.push('coathlength Error');
			}

			if (temppuppy.search(/(RgRg|Rgrg)/) != -1) {
				// console.log("Smooth Coat");
			} else if (temppuppy.search(/(rgrg)/) != -1) {
				pheno.push('Crested Nudari Variety.');
			} else {
				pheno.push('crestvariety Error');
			}

			if (temppuppy.search(/(TltTlt|Tlttlp|Tlttls|Tlttla)/) != -1) {
				pheno.push('Straight Tail.');
			} else if (temppuppy.search(/(tlptlp|tlptls|tlptla)/) != -1) {
				pheno.push('Spiral Tail.');
			} else if (temppuppy.search(/(tlstls|tlstla)/) != -1) {
				pheno.push('Sickle Tail.');
			} else if (temppuppy.search(/(tlatla)/) != -1) {
				pheno.push('Saber Tail.');
			} else {
				pheno.push('tailshape Error');
			}

			/* if (temppuppy.search(/(TltTlt|TltTlttlp|Tlttls|Tlttla)/) != -1) {
				// pheno.push("Large Litters.");
			} else if (temppuppy.search(/(tlptlp|tlptls|tlptla)/) != -1) {
				// pheno.push("Medium Litters.");
			} else if (temppuppy.search(/(tlstls|tlstla)/) != -1) {
				// pheno.push("Small Litters.");
			} else {
				pheno.push("littersize Error");
			} */
		}
		phenomarkings();

		if (pheno.indexOf('Lethal White') != -1) {
			if (roller(5) <= 4) {
				pheno = ['Stillborn'];
			}
		}
	} // end phenoreader();

	function outputpuppy() {
		puppy = [' '];
		pheno = [' '];

		rollcoat();
		var pfix = puppy.toString();
		var pfix = pfix.replace(/,\+,/g, ' + ');
		var pfix = pfix.replace(/,/, '');
		var pfix = pfix.replace(/,/g, ' ');
		var pfix = pfix.trim();
		puppyfinal = pfix;

		// phenoreader();

		var pfix = pheno.toString();
		var pfix = pfix.replace(/\s,/g, '');
		var pfix = pfix.replace(/,/g, ' ');
		var pfix = pfix.replace(/\./g, ',');
		var pfix = pfix.replace(/,$/g, '');
		phenofinal = pfix.replace(/  /g, ' ');
	} // end outputpuppy();

	function multipuppy() {
		var x = roller(100);
		let pupTotal = 0;

		var cslittersize = ssplit.search(/\b(L|l)(L|l)\b/);
		var cdlittersize = dsplit.search(/\b(L|l)(L|l)\b/);

		function littersize() {
			var s1 = ssplit.match(/\b(L|l)(?=L|l)/);
			var s2 = ssplit.match(/(?<=L|l)(L|l)\b/);
			var d1 = dsplit.match(/\b(L|l)(?=L|l)/);
			var d2 = dsplit.match(/(?<=L|l)(L|l)\b/);

			var a = [s1[1], d1[1]];
			var b = [s1[1], d2[1]];
			var c = [s2[1], d1[1]];
			var d = [s2[1], d2[1]];

			var random = [a, b, c, d];
			var random = random[Math.floor(Math.random() * 4)];
			var sortOrder = ['L', 'l'];
			random.sort(function (a, b) {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			});
			var random = random.join('');

			if (random === 'LL') {
				var sizes = [8, 7, 7];
				pupTotal = sizes[Math.floor(Math.random() * sizes.length)];
			} else if (random === 'Ll') {
				var sizes = [6, 5, 5];
				pupTotal = sizes[Math.floor(Math.random() * sizes.length)];
			} else if (random === 'll') {
				var sizes = [4, 3, 3];
				pupTotal = sizes[Math.floor(Math.random() * sizes.length)];
			}
		}

		if (cslittersize != -1 && cdlittersize != -1) {
			littersize();
		} else {
			const warningDiv = document.createElement('div');
			warningDiv.classList.add('col-span-2');
			warningDiv.innerText = `Check Litter Size Genes`;
			document
				.getElementById('puppy-container')
				.appendChild(warningDiv);
			return;
		}

		let pupNum = 1;
		function populatepups() {
			outputpuppy();
			let pupA = {
				geno: puppyfinal,
				pheno: phenofinal,
			};
			outputpuppy();
			let pupB = {
				geno: puppyfinal,
				pheno: phenofinal,
			};

			const puppyDiv = document.createElement('div');
			puppyDiv.classList.add(
				'puppy-output',
				'col-span-2',
				'md:col-span-1',
			);
			puppyDiv.innerHTML = `
				<div>
					<b>Puppy ${pupNum} - Option A</b>
					<br>
					Genotype: ${pupA.geno}
					<br>
					Phenotype: ${pupA.pheno}
				</div>

				<div class="mt-2">
					<b>Puppy ${pupNum} - Option B</b>
					<br>
					Genotype: ${pupB.geno}
					<br>
					Phenotype: ${pupB.pheno}
				</div>
				`;
			document.getElementById('puppy-container').appendChild(puppyDiv);
		}

		for (let i = 1; i <= pupTotal; i++) {
			populatepups();
			pupNum += 1;
		}
	}
	multipuppy();
}
