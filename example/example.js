import fs from '../src/fs'

window.onload = function(){

	fs.init(10*10*1024,function(){

		fs.mkdir('/docs/files/', function(err, dirEntry){
			
			console.log('/docs/files/ created successfully');

			fs.rmdir('/docs', {recursive: true}, function(){
				console.log('/docs/ removed successfully');
			})
		})


		var list = function(){
			fs.list('/', function(err, entries){
				var files = entries.filter(function(entry){
					return entry.isFile;
				})

				var articles = document.getElementById('articles');
				articles.innerHTML = ''; // Remove children

				var content = files.map(function(file){
					var name = file.name;
					return '<li>'+ name +'</li>';
				}).join('')

				articles.innerHTML = content;
			})
		}

		list();

		var saveBtn = document.getElementById('saveBtn');

		saveBtn.addEventListener('click', function(event){
			event.stopPropagation();
			event.preventDefault();

			var title = document.getElementById('title').value,
				text = document.getElementById('content').value;
			
			if(!title || !text) {
				alert('Please enter note title or content');
				return;
			}

			fs.writeFile(title, text, function(err){
				alert('save ' + title + ' successfully');
				list();
			})
		})

		var clearBtn = document.getElementById('clearBtn');

		clearBtn.addEventListener('click', function(event){
			event.stopPropagation();
			event.preventDefault();
			document.getElementById('title').value = '';
			document.getElementById('content').value = '';
		})

	})

}