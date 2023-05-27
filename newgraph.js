import { LightningElement, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartJS';

export default class NewGraph extends LightningElement {
  chartLoaded = false;

  renderedCallback() {
    if (this.chartLoaded) {
      return;
    }

    Promise.all([loadScript(this, chartjs)]).then(() => {
      this.chartLoaded = true;
      this.initializeChart();
    });
  }

  initializeChart() {
    const softwareEngineerSalariesData = [
      { company: 'Company A', salary: 110000 },
      { company: 'Company B', salary: 105000 },
      { company: 'Company C', salary: 115000 },
      { company: 'Company D', salary: 100000 },
      { company: 'Company E', salary: 120000 },
      { company: 'Company F', salary: 95000 },
      { company: 'Company G', salary: 108000 },
      { company: 'Company H', salary: 112000 },
      { company: 'Company I', salary: 98000 },
      { company: 'Company J', salary: 102000 },
    ];

    const data = {
      labels: softwareEngineerSalariesData.map((item) => item.company),
      datasets: [
        {
          data: softwareEngineerSalariesData.map((item) => item.salary),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8A3FFC',
            '#FF9F40',
            '#47CAB1',
            '#C94BFF',
            '#5B5B5B',
            '#00CEC9',
            '#FF4081',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8A3FFC',
            '#FF9F40',
            '#47CAB1',
            '#C94BFF',
            '#5B5B5B',
            '#00CEC9',
            '#FF4081',
          ],
        },
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Software Engineer Salaries in New York City',
        },
        legend: {
          position: 'bottom',
        },
      },
    };

    if (this.chartLoaded) {
      const ctx = this.template.querySelector('canvas');
      const chart = new window.Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
      });
    }
  }
}
