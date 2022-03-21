import { Component, OnInit, ViewChild } from '@angular/core';
import { ThfDialogService, ThfMenuItem, ThfModalAction, ThfModalComponent, ThfRadioGroupOption, ThfTableColumn, ThfTableComponent } from '@totvs/thf-ui';
import { title } from 'process';
import { TabelaService } from './tabela.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  //filtro
  it_codigo_ini: string = ''
  it_codigo_fim: string = ''
  cod_emitente_ini: number = 0
  cod_emitente_fim: number = 0
  cod_estabel_ini: string = ''
  cod_estabel_fim: string = ''
  serie_docto_ini: string = ''
  serie_docto_fim: string = ''
  nro_docto_ini: string = ''
  nro_docto_fim: string = ''
  nr_ficha_ini: number = 0
  nr_ficha_fim: number = 0
  log_pendente: boolean = true
  log_analise: boolean = true
  log_pendret: boolean = true
  log_terminado: boolean = false
  log_cancelado: boolean = false
  log_pendnf: boolean = false


  modal_type = ''
  isHideLoading = true
  columns: Array<ThfTableColumn>
  columnsExame: Array<ThfTableColumn>
  filteredArray: any

  tableData: any
  exames: any
  menuItemSelected: string;

  valorLinha: any

  thousandMaxlength: number = 7

  codExame: any
  descComp: any
  valorComp: any
  index: any
  ultimo: any
  columnsRadio: number = 3
  columnsDec: Array<ThfTableColumn>

  //Decisão
  dataInspecao
  tipoRetorno: any = 1
  textoArea: string
  sequencia
  codDevolucao
  descricao
  item
  qtdAprCondicional
  observacao
  deposito
  localizacao

  //Array para criar a sequencia
  sequenciaArray: Array<any> = []

  @ViewChild(ThfModalComponent, { static: true }) thfModal: ThfModalComponent;
  @ViewChild(ThfTableComponent, { static: true }) thfTable: ThfTableComponent;

  constructor(
    private tabelaService: TabelaService,
    public thfDialog: ThfDialogService,
    public sampleThfMenuHumanResourcesService: TabelaService
  ) { }

  ngOnInit(): void {
    this.loadInitial()
    this.ultimo = false
  }

  loadInitial(): void {
    this.loadTableColumns()
  }

  loadTableColumns(): this {
    this.columns = this.tabelaService.getColumns()
    this.columnsExame = this.tabelaService.getExames(this)
    this.columnsDec = this.tabelaService.getColumnsDecisao(this)
    return this
  }

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this), icon: 'thf-icon-home', shortLabel: 'Home' }
  ];

  readonly columnOptions: Array<ThfRadioGroupOption> = [
    { label: 'Aprovado', value: 1 },
    { label: 'Aprovado Condicional', value: 2 },
    { label: 'Rejeitado', value: 3 }
  ]

  private onClick() {
    alert('Clicked in menu item')
  }

  private modal_primary_action_confirm: ThfModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      this.apiEscq()
      this.thfModal.close()
    }
  }

  private modal_primary_action_texto: ThfModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      let obj = this.filteredArray[this.index + 1]
      this.codExame = obj["cod-exame"]
      this.descComp = obj["descricao-comp"]
      this.valorComp = obj["valores"]
      this.index = this.filteredArray.indexOf(obj)

      this.ultimo = this.index == this.filteredArray.length - 1
    }
  }

  private modal_primary_action_numerico: ThfModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      let obj = this.filteredArray[this.index + 1]
      this.codExame = obj["cod-exame"]
      this.descComp = obj["descricao-comp"]
      this.valorComp = obj["valores"]
      this.index = this.filteredArray.indexOf(obj)

      this.ultimo = this.index == this.filteredArray.length - 1
    }
  }

  private modal_primary_action_faixa: ThfModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      let obj = this.filteredArray[this.index + 1]
      this.codExame = obj["cod-exame"]
      this.descComp = obj["descricao-comp"]
      this.valorComp = obj["valores"]
      this.index = this.filteredArray.indexOf(obj)

      this.ultimo = this.index == this.filteredArray.length - 1
    }
  }

  private modal_primary_action_decisao: ThfModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      this.thfDialog.alert({ title: 'Atenção', message: this.dataInspecao })
    }
  }

  private modal_secondary_action_close: ThfModalAction = {
    label: 'Fechar',
    danger: true,
    action: () => {
      this.thfModal.close()
    }
  }

  private modal_secondary_action_close_decisao: ThfModalAction = {
    label: 'Cancelar',
    danger: true,
    action: () => {
      this.thfModal.close()
    }
  }

  addSequencia() {
    this.sequenciaArray.push({ 'sequencia': this.sequencia })
    this.addActionOnItensDecisao()
  }

  openModalFilter(): void {
    this.modal_type = 'filter'
    this.thfModal.open()
  }

  openModalDecisao(): void {
    this.modal_type = 'decisao'
    this.thfModal.open()
  }

  deleteRowDecisao(row: any): void {
     console.log(row)
    this.sequenciaArray.splice(row, 1) 

    
    /* let posicao = this.sequenciaArray.indexOf(row) 

    if(posicao != 0) {
      this.sequenciaArray.splice(posicao, 1)
    }else{
      
      this.sequenciaArray.pop()
    } */
    
    /* this.sequenciaArray = [] */
    /* if(posicao != 0) {
      this.sequenciaArray.splice(posicao, 1)
    }else{
      
      this.sequenciaArray.pop()
    } */

    /* this.sequenciaArray = this.sequenciaArray.filter((item) => {
      return item != row
    }) */
  }

  closeModal(): void {
    this.thfModal.close()
  }

  abrirModalDetalhe(row: any): void {
    let index = this.filteredArray.indexOf(row)
    this.ultimo = index == this.filteredArray.length - 1
    this.codExame = row["cod-exame"]
    this.descComp = row["descricao-comp"]
    this.valorComp = row["vl-referencia"]
    this.modal_type = 'faixa'
    this.index = this.filteredArray.indexOf(row)
    this.thfModal.open()
  }

  getPrimaryAction(): any {
    let actions = {
      filter: this.modal_primary_action_confirm,
      texto: this.modal_primary_action_texto,
      numerico: this.modal_primary_action_numerico,
      faixa: this.modal_primary_action_faixa,
      decisao: this.modal_primary_action_decisao,
    }

    return actions[this.modal_type]
  }

  getSecondaryAction(): any {
    let actions = {
      filter: this.modal_secondary_action_close_decisao,
      texto: this.modal_secondary_action_close_decisao,
      numerico: this.modal_secondary_action_close_decisao,
      faixa: this.modal_secondary_action_close_decisao,
      decisao: this.modal_secondary_action_close_decisao
    }

    return actions[this.modal_type]
  }

  addActionsOnItens(): void {
    this.filteredArray = this.filteredArray.map((item: any) => {
      item["actions"] = ["digitar"]
      return item
    })
  }

  addActionOnItensDecisao(): void {
    this.sequenciaArray = this.sequenciaArray.map((item: any) => {
      item["actions"] = ["deletar"]
      return item
    })
  }

  apiEscq(): void {
    this.isHideLoading = false
    let params = {
      "it-codigo-ini": this.it_codigo_ini,
      "it-codigo-fim": this.it_codigo_fim,
      "cod-estabel-ini": this.cod_estabel_ini,
      "cod-estabel-fim": this.cod_estabel_fim,
      "cod-emitente-ini": this.cod_emitente_ini,
      "cod-emitente-fim": this.cod_emitente_fim,
      "serie-docto-ini": this.serie_docto_ini,
      "serie-docto-fim": this.serie_docto_fim,
      "nro-docto-ini": this.nro_docto_ini,
      "nro-docto-fim": this.nro_docto_fim,
      "nr-ficha-ini": this.nr_ficha_ini,
      "nr-ficha-fim": this.nr_ficha_fim,
      "log-pendente": this.log_pendente,
      "log-analise": this.log_analise,
      "log-pendret": this.log_pendret,
      "log-terminado": this.log_terminado,
      "log-cancelado": this.log_cancelado,
      "log-pendnf": this.log_pendnf
    }

    this.tabelaService.apiEscq(params, (tableData) => {

      this.isHideLoading = true
      this.tableData = tableData.items[0]["ds_ficha-cq"]["tt-ficha-cq"]
      this.exames = tableData.items[0]["ds_ficha-cq"]["tt-result"]

      this.addActionsOnItens()
    }),
      (err) => {
        console.log("Erro ao listar", err);
      }
  }

  filterArray(row: any): void {
    let ficha = row['nr-ficha']

    this.filteredArray = this.exames.filter(exame => {
      return exame['nr-ficha'] == ficha
    })

    this.addActionsOnItens()
  }

  clearFilterArray(): any[] {
    return this.filteredArray = []
  }

  printMenuAction(menu: ThfMenuItem): void {
    this.menuItemSelected = menu.label;
  }
}
