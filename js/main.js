const app = Vue.createApp({
    data: () => ({
        title: "Degradados con Vue3",
        color1: "#d5ee11",
        color2: "#f59e24",
        orientacion: 1,
    }),
    computed: {
        setColor() {
            if (this.orientacion == 1) {
                return `background: linear-gradient(to right, ${this.color1}, ${this.color2} );`;
            } else if (this.orientacion == 2) {
                return `background: linear-gradient(to left, ${this.color1}, ${this.color2} );`;
            } else if (this.orientacion == 3) {
                return `background: linear-gradient(to top, ${this.color1}, ${this.color2} );`;
            } else {
                return `background: linear-gradient(to bottom, ${this.color1}, ${this.color2} );`;
            }
        },
    },
});