let btnColors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let level = 0

$('.btn').click(handleClick)
$(document).keypress(nextSequence)

function playSound(name) {
	let audioTag = document.createElement('audio')
	document.body.append(audioTag)
	$('audio').attr('src', `./${name}.mp3`)
	audioTag.play()
}

function animatePress(currentColor) {
	$(`#${currentColor}`).addClass('pressed')
	setTimeout(() => $(`#${currentColor}`).removeClass('pressed'), 100)
}

function nextSequence() {
	let randomNum = Math.floor(Math.random() * 4)
	let randomChosenColor = btnColors[randomNum]
	playSound(randomChosenColor)
	$(`#${randomChosenColor}`).fadeOut().fadeIn()

	gamePattern.push(randomChosenColor)
	level += 1
	$('h1').text('Level ' + level)
}

function checkAnswer() {
	if (gamePattern.length === userClickedPattern.length) {
		let equals = gamePattern.every((v, i) => v === userClickedPattern[i])
		if (equals) {
			setTimeout(nextSequence, 1000)
			userClickedPattern = []
		} else {
			$('.btn').unbind('click')
			playSound('wrong')
			$('h1').text('Game Over, Press Any Key to Restart')
			$('body').addClass('game-over')
			setTimeout(() => {
				$('body').removeClass('game-over')
				$('.btn').click(handleClick)
				level = 0
				gamePattern = []
			}, 200)
		}
	}
}

function handleClick(e) {
	let clickedBtn = e.target
	let userChosenColor = clickedBtn.getAttribute('id')
	userClickedPattern.push(userChosenColor)
	playSound(userChosenColor)
	animatePress(userChosenColor)

	checkAnswer()
}
