<?php defined('IN_IA') or exit('Access Denied');?><style type="text/css">
    .table{ margin-bottom: 0px; border:1px solid #eee;border-top:0px; }
    .table td{ text-align: center; }
    .room{background-color: #f5f5f5;}
</style>
<table class="table table-hover room" border="1" style="border:1px solid #999;">
  <thead class="navbar-inner">
    <tr>
      <td  style="width: 12.5%">房型/日期</td>
      <td  onclick='window.prePage()' style="width: 2.5%"><i class=' fa fa-chevron-left'></i></td>
      <?php  if(is_array($date_array)) { foreach($date_array as $row) { ?>
      <td style="width: 8.2%"><?php  echo $row['month'];?>-<?php  echo $row['day'];?></td>
      <?php  } } ?>
      <td  onclick='window.nextPage()' style="width: 2.5%"><i class=' fa fa-chevron-right'></i></td>
    </tr>
  </thead>
  <tbody>
    </tbody>
  
</table>
  <?php  if(is_array($list)) { foreach($list as $item) { ?>
  <table class="table table-hover" border="1" >
    <tr>
    
    <td style="width: 12.5%"><?php  echo $item['name'];?></td>
    
  
        <td style="width: 2.5%">  </td>
        <?php  if(is_array($item['pricearr'])) { foreach($item['pricearr'] as $item1) { ?>
        <td style="width: 8.2%">
          <span class="price_span"><?php  echo $item1['mprice'];?></span>
          <span class="price_editspan hide">
            <input type="text" pid="<?php  echo $item1['pid'];?>" dateday="<?php  echo $item1['dateday'];?>" rid="<?php  echo $item1['rid'];?>" class="price_input form-control" value="<?php  echo $item1['mprice'];?>" />
          </span></td>
        <?php  } } ?>
        <td style="width: 2.5%%"></td>
     
      
    
    </tr>
    
  </table>
  <?php  } } ?>

<input type='hidden' id='page' value="<?php  echo $page;?>" />
<input type='hidden' id='totalpage' value="<?php  echo $totalpage;?>" />
