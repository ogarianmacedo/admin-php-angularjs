<?php

class SendEmail
{
    public static function sendEmailDefault($ass, $mensagem)
    {
        $emailsender = "email@gmail.com";
        // Envia um email de confirmação para o usuario
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= utf8_decode("From: New Tecnologia <$emailsender>" . "\r\n");
        //email do seu domínio hospedado

        //email de quem vai receber
        $emaildestinatario = "email@gmail.com";
        $assunto = utf8_encode($ass);
        $mensagem_resposta = '
		<table width="100%" height="100%" bgcolor="#ebebeb">
            <tbody>
            <tr>
                <td>
                    <br>
                    <br>
                    <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
                        <tbody>
        
                        <tr>
                            <td align="center" nowrap="">&nbsp;</td>
                        </tr>
        
                        <tr>
                            <td align="center">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tbody>
                                    <tr valign="top">
                                        <td>
        
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="text-align:center; ">
                                                                    <img src="http://site.com.br/assets/img/logo.png"
                                                                         style="    height: 90px;" class="CToWUd">
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
        
        
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                   style="    margin-top: 80px;">
                                                <tbody>
                                                <tr>
                                                    <td width="70px"></td>
                                                    <td align="left" valign="middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                            <tr>
                                                                <td width="50%" align="left" valign="middle">
                                                                    <h2 style="font-size:24px;font-family:" Helvetica Neue
                                                                    ",Helvetica,Arial,sans-serif;color:#5e5e5e">
                                                                    <font face="Arial" color="#5e5e5e">
                                                                        <strong></strong>
                                                                    </font>
                                                                    </h2>
        
                                                                    <font face="Helvetica Neue, Helvetica, Arial, sans-serif"
                                                                          color="#5e5e5e">
        
                                                                        <p>
                                                                            ' . $mensagem . '
                                                                        </p>
        
                                                                        <p></p>
                                                                    </font>
                                                                </td>
                                                                <td align="center" valign="middle">
                                                                    <img src="http://site.com.br/site/assets/img/img-email.png"
                                                                         class="CToWUd">
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td width="30px"></td>
                                                </tr>
                                                </tbody>
                                            </table>
        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="50" align="center" valign="top">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="1" align="center" valign="middle">
        
        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="20" align="center" valign="middle"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="10" bgcolor="#EBEBEB">&nbsp;</td>
                        </tr>
                        <tr>
                            <td bgcolor="#EBEBEB">
                                <table width="700" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td width="460">
                                            <font face="Arial, Helvetica, sans-serif" color="#adadad"
                                                  style="font-size:11px"></font>
                                        </td>
                                    </tr>
        
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="30" bgcolor="#EBEBEB">
                                <font face="Arial, Helvetica, sans-serif" color="#adadad" style="font-size:11px">
        
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td height="30" bgcolor="#EBEBEB">&nbsp;</td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <br>
                </td>
            </tr>
            </tbody>
        </table>';

        mail($emaildestinatario, $assunto, $mensagem_resposta, $headers, "-r" . $emailsender);
    }
}
