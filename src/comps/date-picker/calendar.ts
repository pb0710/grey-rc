/* eslint-disable @typescript-eslint/ban-types */
type WithinMonth = 'pre' | 'cur' | 'next'
export interface DateUnit {
	year: number
	month: number
	day: number
	dateStr: string
	withinMonth: WithinMonth
	isToday: boolean
}

export class Calendar {
	curDate: Date
	curYear: number
	curMonth: number
	curDay: number
	renderCallbacks: Function[]
	matrix: DateUnit[][]
	constructor() {
		this.curDate = new Date()
		this.curYear = 0
		this.curMonth = 0
		this.curDay = 0
		this.renderCallbacks = []
		this.matrix = []
	}

	static create() {
		return new Calendar()
	}

	static parseDate(date: Date) {
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		}
	}

	private setCurDate() {
		this.curDate = new Date(this.curYear, this.curMonth, this.curDay)
	}

	private emitRenders() {
		this.setMatrix()
		this.renderCallbacks.forEach(render => render())
	}

	private judgeToday(year: number, month: number, day: number) {
		const today = Calendar.parseDate(new Date())
		return year === today.year && month === today.month && day === today.day
	}

	// 获取 某月总天数
	private getMonthAllDays(year: number, month: number): number {
		return new Date(year, month, 0).getDate()
	}

	//获取 当月第一天是周几
	private getCurFirstWeekDay() {
		return new Date(this.curYear, this.curMonth - 1, 1).getDay()
	}

	private setMatrix() {
		const firstWeekday = this.getCurFirstWeekDay()
		const curMonthAllDays = this.getMonthAllDays(this.curYear, this.curMonth)
		const preMonthAllDays =
			this.curMonth > 1
				? this.getMonthAllDays(this.curYear, this.curMonth - 1)
				: this.getMonthAllDays(this.curYear - 1, 12)

		let cur = preMonthAllDays - firstWeekday + 1
		const count = firstWeekday - 1 + curMonthAllDays
		const result: DateUnit[][] = []

		for (let i = 0; i < 6; i++) {
			result.push([])
			for (let j = 0; j < 7; j++) {
				const curCount = i * 7 + (j + 1)
				const monthAllDays = i === 0 ? preMonthAllDays : curMonthAllDays
				cur = cur >= monthAllDays ? 1 : cur + 1

				let withinMonth: WithinMonth
				if (i === 0 && j + 1 < firstWeekday) withinMonth = 'pre'
				else if (curCount > count) withinMonth = 'next'
				else withinMonth = 'cur'

				result[i].push({
					year: this.curYear,
					month: this.curMonth,
					day: cur,
					withinMonth,
					dateStr: `${this.curYear}-${this.curMonth}-${cur}`,
					isToday: this.judgeToday(this.curYear, this.curMonth, cur)
				})
			}
		}
		this.matrix = result
	}

	public showPreMonth() {
		if (this.curMonth < 1) {
			this.curMonth = 12
			this.curYear--
		} else {
			this.curMonth--
		}
		this.setCurDate()
		this.emitRenders()
	}

	public showNextMonth() {
		if (this.curMonth > 12) {
			this.curMonth = 1
			this.curYear++
		} else {
			this.curMonth++
		}
		this.setCurDate()
		this.emitRenders()
	}

	public updateDate(date: Date) {
		const { year, month, day } = Calendar.parseDate(date)
		this.curYear = year
		this.curMonth = month
		this.curDay = day
		this.curDate = date
		this.emitRenders()
	}

	public addRender(render: Function) {
		this.renderCallbacks.push(render)
		return () => {
			const index = this.renderCallbacks.indexOf(render)
			this.renderCallbacks.splice(index, 1)
		}
	}
}
