import fs from '../src/fs'

window.onload = function(){


	fs.requestQuota().then((bytes) => {
		return fs.init(bytes,window.PERSISTENT)
	}).then(() => {
		fs.existsPath('a.td').then(exists => {
			console.log(exists)
		})

		fs.mkdir('/docs/files/').then(dirEntry => {
			console.log('Full path: ' + dirEntry.fullPath)
		})

		let list = () => {
			fs.list('/').then(entries => {
				var files = entries.filter(function(entry){
					return entry.isFile;
				})

				var articles = document.getElementById('articles');
				articles.innerHTML = '' // Remove children

				var content = files.map(function(file){
					var name = file.name;
					return '<li>'+ name +'</li>'
				}).join('')

				articles.innerHTML = content
			})
		}

		list()

		var saveBtn = document.getElementById('saveBtn');

		saveBtn.addEventListener('click', function(event){
			event.stopPropagation()
			event.preventDefault()

			let title = document.getElementById('title').value
		    let text = document.getElementById('content').value
			
			if(!title || !text) {
				alert('Please enter note title or content')
				return
			}

			fs.writeFile(title, text).then(() => {
				list()
			})
		})

		let clearBtn = document.getElementById('clearBtn');

		clearBtn.addEventListener('click', function(event){
			event.stopPropagation()
			event.preventDefault()
			document.getElementById('title').value = ''
			document.getElementById('content').value = ''
		})
	})

}