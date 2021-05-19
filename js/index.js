const dateContainer = document.querySelector(".date")
const hoursContainer = document.querySelector(".hours")
const minutesContainer = document.querySelector(".minutes")
const buttonContainer = document.querySelector("[type='button']")


const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

const months =
	[
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro"
	]

const state = {
	turns: ["12", "24"],
	isTwentyFour: true
}

const getDate = () => {
	const objDate = new Date()

	const day = objDate.getDay()
	const date = objDate.getDate()
	const month = objDate.getMonth()
	const year = objDate.getFullYear()
	const hours = objDate.getHours()
	const minutes = objDate.getMinutes()
	const seconds = objDate.getSeconds()

	return ({
		day,
		date,
		month,
		year,
		hours,
		minutes,
		seconds
	})
}

const turnChange = unit => unit < 12 ? `${unit}` : `${parseInt(unit) - 12}`

const getFormatedTimeUnit = unit => unit < 10 ? `0${unit}` : `${unit}`

const getFormatedDate = () => {
	const {	day, date, month, year, hours, minutes } = getDate()

	return `${days[day]},<br>${getFormatedTimeUnit(date)} de ${months[month]} de ${year}`
}

const insertUnitInHTML = (element, unit) => {
	element.innerHTML = unit
}

const insertDate = () => {
	const fullDate = getFormatedDate()
	insertUnitInHTML(dateContainer, fullDate)
}

const changeDateIfTrue = (hours, minutes) =>
	hours === 0 && minutes === 0
		? insertDate()
		: false

const turnIsTwentyFour = hours =>
	state.isTwentyFour
		? insertUnitInHTML(hoursContainer, hours)
		: insertUnitInHTML(hoursContainer, turnChange(hours))

const insertTime = () => {
	const { hours, minutes } = getDate()

	changeDateIfTrue(hours, minutes)

	const formatedHours = getFormatedTimeUnit(hours)
	const formatedMinutes = getFormatedTimeUnit(minutes)

	turnIsTwentyFour(hours)

	insertUnitInHTML(minutesContainer, formatedMinutes)
}

const alterState = newState => state.isTwentyFour = newState

const changeButtonInnerText = hours => buttonContainer.innerText = hours

const handleClick = () => {
	if ( buttonContainer.innerHTML === "12h" )
	{
		changeButtonInnerText("24h")
		alterState(true)
		insertTime()
	}
	else if ( buttonContainer.innerHTML === "24h" )
	{
		changeButtonInnerText("12h")
		alterState(false)
		insertTime()
	}
}

const loadPage = () => {
	console.log("load")
	const { seconds } = getDate()

	const restMiliSeconds = ( 60 - seconds ) * 1000
	console.log(restMiliSeconds)

	setTimeout(() => {
		console.log("setTimeout")
		insertTime()
		setInterval(insertTime, 60000)
	}, restMiliSeconds)

	insertDate()
	insertTime()
}

window.addEventListener("load", loadPage)

buttonContainer.addEventListener("click", handleClick)

//Teste de entrada de Horário
const time = () => {
    const time = getDate()

    console.log(time.hours, time.minutes, time.seconds)
}
setInterval(time, 1000)