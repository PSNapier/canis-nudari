let dictionary = {
	bases: [
		// ['pheno', ['Gene','gene'...]],
		['silver', ['Z','z']],
		['yellow', ['Yd','ya','ys','yg','yb','yc']],
		['dune', ['Dnc','dna','dnt','dnd','dnl','dns']],
		['mix', ['Mx','mxx','mxd']],
		['dilute', ['D','d','di']],
	],
	markings: [
		// ['pheno', ['Gene','gene'...]],
		['body stripes', ['Stb','sth','stl','str']],
		['leg stripes', ['Ltb','lth','ltl','ltr']],
		['spinal stripes', ['Pt','pts','ptb']],
		['black spotting', ['Bs','bsk','bss','bsi','bsc']],
		['black points', ['Bp','bp']],
		['black mask', ['Bm','bm']],
		['dorsal strip', ['Bd','bd','bdd']],
		['saddleback', ['Sdl','sdl']],
		['jackalback', ['Jbk','jbk']],
		['frosting', ['F','f']],
		['white spotting', ['S','si','sp']],
		['urajiro', ['U','utgr','u']],
		['koibald', ['Ko','ko','kow','kob','kop','koc']],
		['sable', ['At','ay','ays']],
		['liver', ['B','b']],
	],
	body: [
		// ['pheno', ['Gene','gene'...]],
		['eye shade', ['Ec','ec']],
		['eye chromia', ['Ex','exw','ex']],
		['drop ears', ['Ep','ed']],
		['nose pigment', ['N','n']],
		['coat length', ['Cts','ctm']],
		['crest variety', ['Rg','rg']],
		['tail shape', ['Tlt','tlp','tls','tla']],
		['litter size', ['L','l']],
	],
};

let phenoDictionary = {
	bases: [
		// ['pheno', ['gene|gene', 'gene|gene'...]]
		['dark yellow', ['ZZ|Zz', 'YdYd|Ydya|Ydys|Ydyg|Ydyb|Ydyc']],
		['light yellow', ['ZZ|Zz', 'yaya|yays|yayg|yayb|yayc']],
		['sunset yellow', ['ZZ|Zz', 'ysys|ysyg|ysyb|ysyc']],
		['golden yellow', ['ZZ|Zz', 'ygyg|ygyb|ygyc']],
		['bright yellow', ['ZZ|Zz', 'ybyb|ybyc']],
		['cream yellow', ['ZZ|Zz', 'ycyc']],
		['chestnut dune', ['zz', 'DncDnc|Dncdna|Dncdnt|Dncdnd|Dncdnl|Dncdns']],
		['dark dune', ['zz', 'dnadna|dnadnt|dnadnd|dnadnl|dnadns']],
		['terracotta dune', ['zz', 'dntdnt|dntdnd|dntdnl|dntdns']],
		['dune', ['zz', 'dnddnd|dnddnl|dnddns']],
		['light dune', ['zz', 'dnldnl|dnldns']],
		['sand dune', ['zz', 'dnsdns']],
	],
	dilute: [
		['dilute', ['dd']],
		['double dilute', ['ddi']],
		['lethal white', ['didi']],
	],
	mixSpecial: [
		['hazel yellow', ['mxxmxx', 'ZZ|Zz']],
		['seal dune', ['mxxmxx', 'zz']],
	],
	mix: [
		['hazel yellow', ['mxdmxd', 'ZZ|Zz']],
		['seal dune', ['mxdmxd', 'zz']],
	]
}