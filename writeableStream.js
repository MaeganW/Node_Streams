var fs = require('fs')

var stream = fs.createWriteStream('foo.txt')
stream.on('finish', handleFinish)
stream.write('beep\n')
stream.write('bop\n')
stream.write('boop\n')
stream.end()

function handleFinish(){
	console.log('finished')
}

// run this and it will create a new file called foo.txt with the above output
// or if foo.txt already exists, it will overwrite it with the above text
