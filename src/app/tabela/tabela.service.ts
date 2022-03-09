import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThfTableColumn } from '@totvs/thf-ui';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabelaService {

  private baseUrl: string = environment.base_url_api

  constructor(private http: HttpClient) { }

  getColumns(): Array<ThfTableColumn> {
    return [
      { property: 'nr-ficha', label: 'Roteiro Insp' },
      { property: "cod-emitente", label: "Emit" },
      { property: 'nome-emit', label: 'Nome' },
      { property: "lote-wms", label: "Lote WMS" },
      { property: "situacao", label: 'Situação' },
      { property: "desc-item", label: 'Descrição' },
      { property: "qt-original", label: 'Qtde CQ' },
      { property: "qt-pendente", label: 'Qt Pendente' },
    ]
  }

  getColumnsDecisao(): Array<ThfTableColumn> {
    return [
      { property: 'sequencia', label: 'Seq' },
      { property: '', label: 'Decisão' },
      { property: '', label: 'Cod Dev' },
      { property: '', label: 'Descrição' },
      { property: '', label: 'Observação' },
      { property: '', label: 'Qtd Apr Cond' },
      { property: '', label: 'Qtd Rej' },
      { property: '', label: 'Situação' }
    ]
  }

  getExames(component_instance) {
    return [
      {
        property: "actions", label: "Ações", type: "icon", icons: [
          {
            action: (value, row) => {
              component_instance.abrirModalDetalhe(
                value, row
              )
            },
            color: "primary",
            icon: "thf-icon thf-icon-edit",
            tooltip: "Clique para digitar",
            value: "digitar"
          }
        ]
      },

      { property: 'cod-exame', label: 'Exame' },
      { property: 'descricao-comp', label: 'Desc' },
      { property: 'cod-comp', label: 'Comp' },
      { property: 'vl-referencia', label: 'Val Ref' },
      { property: 'unidade', label: 'Un' },
      { property: 'num-teste', label: 'Teste' },
      { property: 'resultado', label: 'Resultado' },
      { property: 'nr-tabela', label: 'Res Tabela' },
      { property: 'nr-aceita', label: 'Aceit' },
      { property: 'nr-rejeita', label: 'Num Rej' },
      { property: 'tam-amostra', label: 'Tam Amostra' },
      { property: 'qtd-nao-conforme', label: 'Qtd Não Conf' },
      { property: 'vl-referencia', label: 'Freq' },
      { property: 'dt-ult-exame', label: 'Dt Ult Exame' },
    ]
  }


  apiEscq(params?, sucess_func?, error_func?) {
    let url = this.baseUrl + 'api-escq100.r'

    let headers_send = new HttpHeaders();
    headers_send = headers_send.append("Authorization", "Basic " + btoa("maikon:Titi@01titi"))
    headers_send = headers_send.append("Content-Type", "application/json")

    let params2 = {
      "tt-param": params
    }

    return this.http.post(url, params2, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true,
      params: params2
    }).subscribe(sucess_func, error_func)
  }

}
