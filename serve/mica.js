    var last_data = '';
    var first_time = false;
    var debug = false;
    var frontpage = false;
    //var debug = true;
    function unavailable(error) {
        if (!error) {
            error = local('requestfailed');
            if (error = "" || !error || error == undefined) {
                error = "unavailable(false)";
            }
        }

        return "<div class='img-rounded jumbotron style='padding: 10px'>" + error + "</div>";
    }
    var prmstr = window.location.search.substr(1);
    var prmarr = prmstr.split ("&");
    var params = {};
    var heromsg = "<div class='hero-unit' style='padding: 5px'>";
    var translist = [];
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    var active = "app";
    var liststate = "all";
    var storytarget = 'none';
    var firstload = false;
    var firstloaded = false;
    var exploded_uuid = false;
    var exploded_name = false;
    var ci;
    var con = false;
    var jid = false;
    var first_reconnect = true;
var names = ["Reading", "Chatting", "Finished", "Reviewing", "Notready", "New"];
var list_mode = true;
var last_opened = "";
var view_images = false;
var show_both = false;
var current_meaning_mode = false;
var current_view_mode = "text";
var current_page = -1;
var current_mode = "read";
var current_uuid = "uuid";
var curr_img_num = 0;
var curr_pages = 0;
var oDbg, con;
var d = new Date();
var start_trans_id = Math.round(d.getTime() / 1000);
var flashTimer="";
var converse_first_time = true;

var spinner = "<img src='data:image/gif;base64,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' width='20px'>";

if ("object" in params)
    active = params["object"];

if ("liststate" in params)
    liststate = params["liststate"];

var do_refresh = false;
var secs = 20;
var failcount = 0;
var newRefresh = 0;
var finish = false;


function disconnect_complete(json, opaque) {
    done();
    if (json.success) {
        window.location.href = "/";
    } else {
        alert(json.desc);
    }
}

function disconnect() {
    loading();
    go(false, 'disconnect', unavailable(false), disconnect_complete, false);
}

function connect_complete(json, opaque) {
    if (json.success || !json.replicated) {
        console.log("Ready?");
        if (json.replicated) {
            console.log("Replicated. yay.");
            window.location.href = "/";
        } else {
            console.log("Not yet replicated...sleeping.");
            setTimeout(check_ready, 1000);
        }
    } else {
        console.log("Failed.");
        done();
        $("#newaccountresultdestination").html("<div class='img-rounded jumbotron style='padding: 10px'>" + msg + "</div>");
        $("#newaccountresultdestination").attr("style", "display: block");
        $("#maindisplay").attr("style", "display: none");
        $("#fh5co-header").attr("style", "display: none");
    }
}

function check_ready() {
    console.log("Sending request again.");
    go(false, 'read', unavailable(false), connect_complete, false);
}

function local(msgid) {
    return $("#" + msgid).html();
}

function go_callback(callback, data, opaque) {
    if(callback != false && callback != undefined) {
       if (opaque)
           callback(data, opaque);
       else
           callback(data);
    }
}

function go(form_id, url, error, callback, opaque){
    var form = false;
    var id = '';

    if (form_id) {
        form = form_id[0];
        id = form_id[1];
    }

    function go_temp(XMLHttpRequest, ajaxOptions, thrownError) {
        console.log("Ignoring temporary error: " + XMLHttpRequest.status + " id: " + id);
    }
    function go_fail(XMLHttpRequest, ajaxOptions, thrownError) {
        console.log("AJAX Status code: " + XMLHttpRequest.status + " id: " + id);
        // Need to handle 504's (busy) like our tests do and repeat the request
        if (XMLHttpRequest.status == 401) {
              window.location.href = "/";
        } else {
            var aff = $(form).attr('ajaxfinish');
            if(form && aff != undefined) {
			    eval(aff + "('" + error + "')");
            } else {
                if(id != undefined && id != '') {
                    $(id).html(error);
		        } else {
                    error = unavailable(XMLHttpRequest.responseText);
                    if (!callback) {
                        $(document.body).prepend(unavailable(XMLHttpRequest.responseText));
                    }
                }

                if (callback) {
                    go_callback(callback, {"success" : false, "desc" : error}, opaque);
                }
            }
        }
    }

    function go_success(response) {
        var go_to_messages = false;
        var htmlresp = false;
        try {
            JSON.parse(response);
        } catch(err) {
            htmlresp = true;
        }

        if(htmlresp && (response.indexOf(local("notsynchronized")) != -1 || (response.indexOf("<h4>Exception:</h4>") != -1 && response.indexOf("<h4>") != -1))) {
            $(id).html(response);
        } else {
            var aff = false;
            if (form)
                aff = $(form).attr('ajaxfinish');

            if(id != undefined && id != '') {
                try {
                    response = JSON.parse(response);
                    $(id).html(response.desc);
                } catch(err) {
                    console.log("ERROR parsing: " + response + ": " + err);
                    $(id).html(response);
                }
            } else {
                if(!aff) {
                    try {
                        response = JSON.parse(response);
                        if ("job_running" in response && response.job_running) {
                            $("#messages_content").html(response.desc);
                            go_to_messages = true;
                            firstloaded = false;
                        }
                    } catch(err) {
                        console.log("ERROR parsing: " + response + ": " + err);
                    }
                }
            }

            if(form && aff) {
                if (id == '' || id == undefined) {
                    eval(aff + "(" + response + ")");
                } else {
                    eval(aff + "('" + response + "')");
                }
            } else {
                go_callback(callback, response, opaque);

                if(id != undefined && id != '' && htmlresp && response.indexOf('<script') != -1) {
                    //have to replace script or else jQuery will remove them
                    $(response.replace(/script/gi, 'mikescript')).find('mikescript').each(function (index, domEle) {
                        if (!$(this).attr('src')) {
                            eval($(this).text());
                        }
                    });
                }
            }
        }

        if (go_to_messages) {
            $.mobile.navigate("#messages");
            setTimeout("loadstories(false, ['#stories', false]);", 5000);
        }
    }

    jQuery.support.cors = true;

    retryoptions = {times:5, timeout: 1000, statusCodes: [0, 503, 504], error: go_fail, start: function() {}};
    if (form) {
        var formData = $(form).serialize();

        $.ajax({
                type: 'POST',
                url: '/api?human=0&alien=' + $(form).attr('action'),
                data: formData,
        }).retry(retryoptions).then(go_success);
    } else {
        if(id != undefined && id != '')
            var human = 1;
        else
            var human = 0;

        $.ajax({
                url: '/api?human=' + human + '&alien=' + url,
                type: "GET",
                dataType: "html",
        }).retry(retryoptions).then(go_success);
    }
}

function CountBack(id, barid, left, opaque) {
    if(do_refresh) {
        if(left >= 0) {
            newSecs = left - 1;
            if(newRefresh) {
                newSecs = newRefresh;
                newRefresh = 0;
            }

            if(id != false && id != 'false')
                document.getElementById(id).innerHTML = left;

            if(left != 0 && barid != false && barid != 'false')
                document.getElementById(barid).style.width = ((secs - left) / secs) * 100 + "%";
            setTimeout("CountBack('" + id + "', '" + barid + "', " + newSecs + ", '" + opaque + "');", 990);
        } else {
            if(opaque != false)
                finish(opaque);
        }
    } else {
        if(id != false && id != 'false') {
            console.log("ID: " + id);
            document.getElementById(id).innerHTML = '';
        }
    }
}

function trans_wait_poll(uuid) {
    if (first_time) {
        secs = 10;
    } else {
        secs = 5;
    }
    first_time = false;
    setTimeout("trans_poll('" + uuid + "');", 5000);
}

function trans_poll_complete(json, uuid) {
    if (json.translated.pages == 0) {
    	json.translated.pages = json.translated.page;
    }

    if (json.translated.translating == "yes" || first_time) {
        $("#translationstatus" + uuid).html(spinner + "&nbsp;&nbsp;" + local("working") + ": " + local("page") + ": " + json.translated.page + "/" + json.translated.pages + ", " + json.translated.percent + "%");
        trans_wait_poll(uuid);
    } else {
        firstloaded = false;
        $("#translationstatus" + uuid).html(local('donereload'));
        loadstories(false, [false, false]);
    }
}

function trans_poll(uuid) {
   go(false, 'read&tstatus=1&uuid=' + uuid,
       unavailable(false),
       trans_poll_complete,
       uuid);
}

function trans_stop(json, uuid) {
    finish = false;
    do_refresh = false;
    $("#translationstatus").html(json.desc);
    $("#translationstatus" + uuid).html('Done! Please reload.');
    loadstories(false, ["#reviewing", false]);
}

function trans_start(uuid) {
    $("#transbutton" + uuid).attr("style", "display: none");
    do_refresh = true;
    first_time = true;
    finish = trans_poll;
    trans_poll(uuid);
    $.mobile.navigate("#notready");
    $("#translationstatus").html(spinner + "&nbsp;" + local("storiestranslating") + "...");
    $("#translationstatus" + uuid).html(spinner + "&nbsp;" + local("translating") + "...");
}

function trans(uuid) {
   trans_start(uuid);
   go(false, 'home&translate=1&uuid=' + uuid, unavailable(false), trans_stop, uuid);
}

function toggle_specific(prefix, name, check) {
    var elms = document.getElementsByClassName(prefix + name);

    if (check) {
        if(elms[0].style.display == 'none') {
           if (last_opened != "" && last_opened != name) {
               toggle(last_opened, 0);
           }
           last_opened = name;
        } else {
           last_opened = "";
        }
    }

    for (var i = 0; i < elms.length; i++) {
        e = elms[i];

        if(e.style.display == 'none') {
               e.style.display = 'block';
        } else {
               e.style.display = 'none';
        }
    }
}

function toggle(name, check) {
   toggle_specific('trans', name, check);
}

function prepare_one_edit(batch, uuid, uhashes, transids, nbunits, chars, pinyin, indexes, pages, operation) {
  	  var op = {
  	  			"operation": operation,
  	  			"uuid" : uuid,
  	  			"units" : chars.length,
  	  			"failed" : true,
  	  			"chars" : chars[0],
  	  			"pinyin" : pinyin[0]
  	  			 };
      var out = "";
      if (chars.length == 0) {
          out += local("notselected");
      } else if (operation == "split" && chars.length > 1) {
          out += local("cannotsplit");
      } else if (operation == "split" && chars[0].split('').length < 2) {
          out += local("onlyhasone");
      } else if (operation == "merge" && chars.length < 2) {
      	  if (batch)
      	      return "";
          out += local("atleasttwo");

      } else {
          var consecutive = true;

          if (operation == "split") {
              op["nbunit"] = nbunits[0];
              op["uhash"] = uhashes[0];
              op["index"] = indexes[0];
              op["pagenum"] = pages[0];
              op["pinyin"] = pinyin[0];
          } else {
              for(var x = 0; x < chars.length; x++) {
                 if (x > 0 && ((parseInt(transids[x]) - 1) != parseInt(transids[x-1]))) {
                     consecutive = false;
                     break;
                 }
                 if (!consecutive) {
                        break;
                 }
                 op["nbunit" + x] = nbunits[x];
                 op["uhash" + x] = uhashes[x];
                 op["index" + x] = indexes[x];
                 op["page" + x] = pages[x];
	             op["chars" + x] = chars[x];
	             op["pinyin" + x] = pinyin[x];
              }
          }
          if (consecutive) {
	      	  op["failed"] = false;
          } else {
              out = local("notconsecutive");
          }
      }

      op["out"] = out

      return op;
}

function process_edits(uuid, operation, batch) {
      var uhashes = [];
      var transids = [];
      var nbunits = [];
      var chars = [];
      var pinyin = [];
      var indexes = [];
      var pages = [];
      var batchids = [];
      var operations = [];
      var selector_class = batch ? "batch" : "label";
      var edits = []

      $("span." + selector_class + " > a").each(function(index) {
        chars.push($(this).text().trim());
        uhashes.push($(this).attr('uniqueid'));
        nbunits.push($(this).attr('nbunit'));
        transids.push($(this).attr('transid'));
        pinyin.push($(this).attr('pinyin'));
        indexes.push($(this).attr('index'));
        pages.push($(this).attr('page'));
        batchids.push($(this).attr('batchid'));
        operations.push($(this).attr('operation'));
        select_toggle($(this).attr("transid"));
      });

      var out = "";

      if (batch) {
			var t_uhashes = [];
			var t_transids = [];
			var t_nbunits = [];
			var t_chars = [];
			var t_pinyin = [];
			var t_indexes = [];
			var t_pages = [];
			var t_operations = [];
			var curr_batch = batchids[0];
		    for (var x = 0; x < batchids.length; x++) {
		    	if (batchids[x] != curr_batch) {
					edits.push(prepare_one_edit(batch, uuid, t_uhashes, t_transids, t_nbunits, t_chars, t_pinyin, t_indexes, t_pages, t_operations[0]));
					t_uhashes = [];
					t_transids = [];
					t_nbunits = [];
					t_chars = [];
					t_pinyin = [];
					t_indexes = [];
					t_pages = [];
					t_operations = [];
				}
				
				curr_batch = batchids[x];
			
	    		t_uhashes.push(uhashes[x]);
	    		t_transids.push(transids[x]);
	    		t_nbunits.push(nbunits[x]);
	    		t_chars.push(chars[x]);
	    		t_pinyin.push(pinyin[x]);
	    		t_indexes.push(indexes[x]);
	    		t_pages.push(pages[x]);
	    		t_operations.push(operations[x]);
		    }

		    // handle the last batch...

		    if (t_uhashes.length > 0) {
				edits.push(prepare_one_edit(batch, uuid, t_uhashes, t_transids, t_nbunits, t_chars, t_pinyin, t_indexes, t_pages, t_operations[0]));
		    }
      } else {
		  edits.push(prepare_one_edit(batch, uuid, uhashes, transids, nbunits, chars, pinyin, indexes, pages, operation));
      }

      out += "<h4>" + local("areyousure") + "</h4>\n";
      out += "<form ajaxfinishid='learn_content' ajaxfinish='install_pages_if_needed' class='ajaxform chattable' data-ajax='false' method='post' action='edit'>"
      var editcount = 1;
      out += "<table>"
      for(var x = 0; x < edits.length; x++) {
	      out += "<tr>";
      	  out += "<td>#" + editcount + ")&nbsp;</td>";
      	  	
      	  if (edits[x]["operation"] == "split") {
      	  	  out += "<td>" + local("split") + " ";
	      	  if (edits[x]["failed"] == true) {
		      	  out += "(INVALID)"
	      	  } else {
		      	  editcount += 1;
	      	  }
	      	  out += ":&nbsp;</td><td>" + edits[x]["chars"] + "(" + edits[x]["pinyin"] + ")</td>";
	      } else {
      	  	  out += "<td>" + local("merge") + " ";
	      	  if (edits[x]["failed"] == true) {
		      	  out += "(" + local("invalid") + ")"
	      	  } else {
		      	  editcount += 1;
	      	  }

			  out += ":&nbsp;</td>";
	      	  for (var y = 0; y < edits[x]["units"]; y++) {
	      	  	  if (edits[x]["chars" + y] == undefined)
			          out += "<td>" + edits[x]["chars"] + "</td>"
			      else
			          out += "<td>" + edits[x]["chars" + y] + "</td>"
			
	      	  	  if (edits[x]["pinyin" + y] == undefined)
			          out += "<td>&nbsp;" + edits[x]["pinyin"];
			      else
			          out += "<td>&nbsp;" + edits[x]["pinyin" + y];
	      	  	  if (y < (edits[x]["units"] - 1)) {
	      	  	      out += ", &nbsp;";
	      	  	  }
				  out += "</td>";
	      	  }
      	  }
	      out += "</tr>";
      	  if (edits[x]["failed"] == true) {
      	  	out += "<tr><td></td><td>" + local("reason") + ":</td><td colspan='100'>" + edits[x]["out"] + "</td></tr>";
      	  }
      }
      out += "</table>"
  	  out += "<input type='hidden' name='oprequest' value='" + JSON.stringify(edits) + "'/>\n";
  	  out += "<input type='hidden' name='uuid' value='" + uuid + "'/>\n";
  	  out += "<p/><p/>";
  	  if (editcount > 1) {
	      out += "<input data-role='none' class='btn btn-default' name='submit' type='submit' value='" + local("submit") + "'/>";
	  } else {
	      out += local("seeabove");
  	  	
  	  }
      out += "</form>"

      $('#regroupdestination').html(out);
      form_loaded(false, true);
      $('#regroupModal').modal('show');
}

function process_instant(with_spaces, lang, source, target, username, password) {

    var languageitem = $('#chattextlanguage').val();
    if (languageitem != undefined) {
        var languagepair = languageitem;
        var pair = languagepair.split(",")
        var source = pair[0];
        var target = pair[1];
     }

     var chars = [];
     var allchars = "";
     $("span.label > a").each(function(index) {
	      if (with_spaces) {
            chars.push($(this).text().trim());
	      } else {
            var split = $(this).text().trim().split('');

            for(var x = 0; x < split.length; x++) {
                chars.push(split[x]);
            }
	      }
          select_toggle($(this).attr("transid"));
      });

     for(var x = 0; x < chars.length; x++) {
          allchars += chars[x];
	  if (with_spaces) {
	      if (x != (chars.length - 1))
                  allchars += " ";
	  }
     }

     if (allchars == "") {
         alert(local("notselected"));
     } else {
        $.mobile.navigate('#instant');
        $('#instantspin').attr('style', 'display: inline');

       var url = 'instant&source=' + allchars + "&lang=" + lang + "&source_language=" + source + "&target_language=" + target

       if (username)
           url += "&username=" + username
       if (password)
           url += "&password=" + password

       go(false, url, local("onlineoffline"), offinstantspin, false);
       }
}

function select_toggle(name) {
       var spanclass = $("#spanselect_" + name).attr('class');
       if (spanclass == "none") {
           $("#spanselect_" + name).attr('class', 'label label-info none');
       } else if (spanclass == "batch") {
           $("#spanselect_" + name).attr('class', 'label label-info batch');
       } else if (spanclass == "label label-info batch") {
           $("#spanselect_" + name).attr('class', 'batch');
       } else if (spanclass == "label label-info none") {
           $("#spanselect_" + name).attr('class', 'none');
       }
}

function select_chat_option(me, select_idx) {
    var mee = $(me);
    var ul = mee.closest('ul');
    var boxid = ul.attr('prefid');
    var chatbox = $("[id='" + boxid + "']");
    var cbox = chatbox.find("textarea.chat-textarea");
    var nbox = cbox.get(0);
    nbox.receivePush(select_idx);
}

function multipopinstall(trans_id) {
    $('#ttip' + trans_id).popover(
        {  placement: 'bottom',
    //$('#ttip' + trans_id).popover({placement: 'bottom-right',
           trigger: 'manual',
           html: true,
           content: function() {
                return $('#pop' + trans_id).html();
           }}).click(function(e) {
                $('#ttip' + trans_id).not(this).popover('hide');
                e.stopPropagation();
            });

    $(document).click(function(e) {
        if (!$(e.target).is('#ttip' + trans_id + ', .popover-title, .popover-content')) {
            $('#ttip' + trans_id).popover('hide');
        }
    });
}

function multipoprefresh(json, opaque) {
    done();
    var trans_id = opaque[0];
    var spy = opaque[1];
    $('#pop' + trans_id).html(json.desc);
    if (spy) {
        $('#ttip' + trans_id).html(spy);
        $('#ttip' + trans_id).popover('hide');
    } else {
        $('#ttip' + trans_id).popover('show');
    }
}

function multiselect(uuid, index, nb_unit, trans_id, spy, page) {
    if(!spy && $('#ttip' + trans_id).data()['bs.popover'].tip().hasClass('in')){
      // popover is visable
      $('#ttip' + trans_id).popover('hide');
    } else {
        loading();
        // popover is not visable
        go(false, 'home&view=1&uuid=' + uuid + '&multiple_select=1'
              + '&index=' + index + '&nb_unit=' + nb_unit + '&trans_id=' + trans_id + "&page=" + page,
              unavailable(false),
              multipoprefresh,
              [trans_id, spy]);
    }
}

function process_reviews(uuid, batch) {
      var count = 0;
      var out = "";
      var form = "";
      form += "<form ajaxfinishid='learn_content' ajaxfinish='install_pages_if_needed' class='ajaxform' data-ajax='false' method='post' action='home'>"
      out += "<ol>";

      $("span.review").each(function(index) {

        out += "<li>(" + $(this).attr('source') + ") " + local("reviewchange") + ": " + $(this).attr('target') + "</li>";
        form += "<input type='hidden' name='transid" + count + "' value='" + $(this).attr('transid') + "'/>\n";
        form += "<input type='hidden' name='index" + count + "' value='" + $(this).attr('index') + "'/>\n";
        form += "<input type='hidden' name='nbunit" + count + "' value='" + $(this).attr('nbunit') + "'/>\n";
        form += "<input type='hidden' name='page" + count + "' value='" + $(this).attr('page') + "'/>\n";

        count += 1;
      });

      out += "</ol>";
      form += "<input type='hidden' name='count' value='" + count + "'/>\n";

      form += "<input type='hidden' name='bulkreview' value='1'/>";
      form += "<button style='border: 2px solid black' data-role='none' style='border: 2px solid black' class='btn btn-default' type='submit'>" + local("submit") + "</button>";
      form += "</form>"
      out += form

      if (count == 0) {
          out = "<h4>" + local('norecommend') + "</h4>";
      }
      $('#reviewdestination').html(out);
      form_loaded(false, true);
      $('#reviewModal').modal('show');
}

function change_pageimg_width(curr_img_num) {
    $('#pageimg' + curr_img_num).css('width', $('#pageimg' + curr_img_num).width());
    $('#pageimg' + curr_img_num).css('top', 55 + $('#readingheader').height());
    $('#pageimg' + curr_img_num).css('bottom', 0);
}

function restore_pageimg_width() {
    return false;
}

function finish_new_account_complete(json, opaque) {
    $("#newaccountresultdestination").html(json.desc);
    $("#newaccountresultdestination").attr("style", "display: block");
    if(!json.success) {
        $("#maindisplay").attr("style", "display: block");
        $("#fh5co-header").attr("style", "display: block");
    }
}

function finish_new_account(code, who, state) {
    $("#maindisplay").attr("style", "display: none");
    //$("#fh5co-header").attr("style", "display: none");
    go(false, "api?human=0&alien=" + who + "&connect=1&finish=1&code=" + code + "&state=" + state, unavailable(false), finish_new_account_complete, false);
}

function next_mode(others) {
    var opts = Object.keys(modes); 
    for(x = 0; x < opts.length; x++) {
        if (others[opts[x]]) {
            others[opts[x]] = false;
            return opts[x];

        }
    }
    return false;
}

function view_show(mode) {
    $("#pagecontent" + mode).attr("style", "display: block");
    $("#stats" + mode).attr("style", "display: block");
    var others = $.extend({}, modes);
    others[mode] = false;
    while(true) {
        next = next_mode(others);
        if(!next)
            break;
        $("#pagecontent" + next).attr("style", "display: none");
        $("#stats" + next).attr("style", "display: none");
    }
    $('#' + mode + 'butt').attr('class', 'active btn btn-default');
    go(false, 'read&skip_default=1&last_view_mode=' + mode, unavailable(false), false, false);

    /*
     * For some strange reason, each time JQM tries
     * to show the page, bootstrap receives some kind
     * of trigger event to remove the affix properties
     * of the div, so it turns off the affixed behavior.
     * So, just add it back below, and it seems OK.
     */
    $('#readingheader').affix();
    $('#readingheader').on('affix-top.bs.affix', function() { return false; });
    $.mobile.navigate('#learn');
}

function got_image(json, opaque) {
    var curr_img_num = opaque[0];
    var obj = $('#pageimg' + curr_img_num);
    obj.html(json.desc);
    obj.affix();
    change_pageimg_width(curr_img_num);
    obj.on('affix.bs.affix', function() {change_pageimg_width(curr_img_num)});
    obj.on('affix-top.bs.affix', function() {change_pageimg_width(curr_img_num)});
    obj.on('affix-bottom.bs.affix', function() {change_pageimg_width(curr_img_num)});
}
function view_actual(mode, uuid, page, others, first) {
    if (!mode) {
        return;
    }
    var url = mode + '&view=1&uuid=' + uuid + '&page=' + page + "&start_trans_id=" + start_trans_id;

    if(!first) {
        url += "&skip_default=1";
    }
  
    if (first) {
        holders = "";
        if (show_both) {
            curr_img_num += 1;
        }
        text = "<div id='pagecontenthome' style='display: none'/><div id='pagecontentedit' style='display: none'/><div id='pagecontentread' style='display: none'/>";
        image = "<div id='pageimg" + curr_img_num + "'>" + "<br/><br/>" + spinner + "&nbsp;" + local("loadingimage") + "...</div>";
        if (show_both) {
            holders = "<div class='col-md-5 nopadding'>" + image + "</div><div class='col-md-7 nopadding'>" + text + "</div>";
        } else {
            if (view_images) {
                holders = image;
            } else {
                holders = text;
            }
        }

        $("#pagecontent").html(holders);
    }

    if (show_both) {
        $("#pagecontent" + mode).html("<div style='padding-left: 5px' id='pagetext" + mode + "' class='col-md-7 nopadding'>" + "<br/><br/>" + spinner + "&nbsp;" + local("loadingtext") + "...</div>");

        go(false, url, unavailable(false), 
            function(json, opaque) { 
                $('#pagetext' + mode).html(json.desc);
                start_trans_id += json.desc.length;
                view_actual(next_mode(others), uuid, page, others, false);
            }, false);

        if (first) {
            go(false, url + "&image=0", unavailable(false), got_image, [curr_img_num]);
        }

    } else {
        $("#pagecontent" + mode).html("<div class='nopadding'><div id='" + mode + "pagesingle'></div></div>");
        if (view_images) {
            url += "&image=0";
            $("#" + mode + "pagesingle").html("<br/><br/>" + spinner + "&nbsp;" + local("loadingimage") + "...");
        } else {
            $("#" + mode + "pagesingle").html("<br/><br/>" + spinner + "&nbsp;" + local("loadingtext") + "...");
        }

        go(false, url, unavailable(false), 
            function(json, opaque) { 
                start_trans_id += json.desc.length
                if(view_images) {
                    $('#pagecontent').html(json.desc);
                } else {
                    $('#' + mode + 'pagesingle').html(json.desc);
                    view_actual(next_mode(others), uuid, page, others, false);
                }
            },
            false);
    }

    if (first) {
        $("#pagecontent" + mode).attr("style", "display: block");
    }
}
   	

var modes = {
    home: true,
    edit: true,
    read: true
}

function view(mode, uuid, page) {
    $("#gotoval").val(page + 1);
    $("#pagetotal").html((current_pages == 0 || current_pages == "0") ? 1 : current_pages);

    window.scrollTo(0, 0);


    var others = $.extend({}, modes);
    others[mode] = false;
    var clone = $.extend({}, others);
        
    view_actual(mode, uuid, page, others, true);
    listreload(mode, uuid, page, clone, true);

    current_page = page;
    current_mode = mode;
    current_uuid = uuid;

    $('#loadingModal').modal('hide');
    view_show(mode);
}

function install_pages(mode, pages, uuid, start, view_mode, reload, meaning_mode) {
    current_pages = pages;
    current_view_mode = view_mode;
    current_meaning_mode = meaning_mode;

    if (view_mode == "text") {
        view_images = false;
        show_both = false;
    } else if(view_mode == "images") {
        view_images = true;
        show_both = false;
    } else if(view_mode == "both") {
        view_images = false;
        show_both = true;
    }

    $('#pagenav').bootpag({
        total: parseInt(pages),
        page: parseInt(start) + 1,
        maxVisible: 5
    }).on('page', function(event, num) {
        view(mode, uuid, num-1);
    });

    if(reload) {
        view(mode, uuid, parseInt(start));
    }
}

function memory_complete(data, opaque) {
    var id = opaque[0];
    var memorized = opaque[1];
    toggle(id, 0);
    done();
    if (memorized) {
        $('#memoitem' + id).attr('style', 'display: block');
    } else {
        $('#memoitem' + id).attr('style', 'display: none');
    }
}

function memory(id, uuid, nb_unit, memorized, page, source_language, target_language) {
    loading();
    go(false, 'read&uuid=' + uuid + '&memorized=' + memorized + '&nb_unit=' + nb_unit + '&page=' + page + '&source_language=' + source_language + '&target_language=' + target_language,
        unavailable(false),
        memory_complete,
        [id, memorized]);
}

function memorize(id, uuid, nb_unit, page, source_language, target_language) {
    memory(id, uuid, nb_unit, 1, page, source_language, target_language);
}

function forget(id, uuid, nb_unit, page, source_language, target_language) {
    memory(id, uuid, nb_unit, 0, page, source_language, target_language);
}

function memory_nostory(id, source, multiple_correct, memorized, source_language, target_language) {
    loading();
    go(false, 'read&source=' + source + '&memorizednostory=' + memorized + '&multiple_correct=' + multiple_correct + '&source_language=' + source_language + '&target_language=' + target_language,
        unavailable(false),
        memory_complete,
        [id, memorized]);
}

function memorize_nostory(id, source, multiple_correct, source_language, target_language) {
    memory_nostory(id, source, multiple_correct, 1, source_language, target_language);
}

function forget_nostory(id, source, multiple_correct, source_language, target_language) {
    memory_nostory(id, source, multiple_correct, 0, source_language, target_language);
}

function reveal_all(hide) {
    //var curr = $("html").scrollTop(),
    var changed = {};
    $("div.reveal").each(
    function() {
        var id = $(this).attr('revealid');
        if (changed[id] == undefined) {
            changed[id] = true;
            reveal(id, hide);
        }
    });

    //$("html").scrollTop(curr);
}

function reveal(id, hide) {
    var rele = document.getElementsByClassName("reveal" + id);

    if (!hide) {
        if(rele[0].style.display != 'none') {
            toggle_specific('reveal', id, 0);
            toggle_specific('definition', id, 0);
        }
    } else {
        if(rele[0].style.display == 'none') {
            toggle_specific('reveal', id, 0);
            toggle_specific('definition', id, 0);
        }
    }
}

function offinstantspin(json, opaque) {
    $('#instantspin').attr('style', 'display: none');
    if (json.success) {
        $("#instanterror").attr('style', 'display: none');
        $("#instantdestination").attr('style', 'display: block');
        $("#selectedresult").html("(" + json.desc.whole.source + "): " + json.desc.whole.target);
        var pieceresult = "";
        for (var x = 0; x < json.desc.online.length; x++) {
            pieceresult += "(" + json.desc.online[x].char + "): ";
            pieceresult += json.desc.online[x].target + "<br/>";
        }
        $("#piecemealresult").html(pieceresult);
        var offlineresult = "";
        for (var x = 0; x < json.desc.offline.length; x++) {
            offlineresult += "(" + json.desc.offline[x].request + "): ";
            if (json.desc.offline[x].target) {
                offlineresult += json.desc.offline[x].target;
            } else {
                offlineresult += local('noinstant');
            }
            offlineresult += "<br/>";
        }
        $("#offlineresult").html(offlineresult);

    } else {
        $("#instantdestination").attr('style', 'display: none');
        $("#instanterror").attr('style', 'display: block');
        $("#instanterror").html(json.desc);
    }

//  $('#instantModal').modal('show');
//  $(document).unbind("mouseup");
//  $(document).unbind("mouseleave");
//  $(document).unbind("copy");
//  install_highlight();
//  $("html").scrollTop(curr);
}

function install_highlight() {
    if(!window.Trans){
        Trans = {};
    }

    Trans.Selector = {};

    Trans.Selector.getSelected = function(){
        var t = '';
        if(window.getSelection) {
            t = window.getSelection();
        } else if(document.getSelection) {
            t = document.getSelection();
        } else if(document.selection) {
            t = document.selection.createRange().text;
        }

        return t;
    }

    Trans.Selector.mouseup = function(){
        var st = Trans.Selector.getSelected();
        if(st != '') {
           $('#instantspin').attr('style', 'display: inline');
           $.mobile.navigate('#instant');
           go(false, 'instant&source=' + st + "&lang=en",
              unavailable(false),
              offinstantspin,
              false);
        }
    }

    Trans.Selector.mouseleave = Trans.Selector.mouseup;
    Trans.Selector.copy = Trans.Selector.mouseup;

    $(document).ready(function(){
        $(document).bind("mouseup", Trans.Selector.mouseup);
        $(document).bind("mouseleave", Trans.Selector.mouseleave);
        $(document).bind("copy", Trans.Selector.mousecopy);
    });
}

function modifyStyleRuleValue(style, selector, newstyle, sheet) {
    var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;

    for (var i = 0, l = sheets.length; i < l; i++) {
        var sheet = sheets[i];
        var all = "";
        var rules = sheet.cssRules;

        if (!rules) {
            rules = sheet.rules;
        }

        if( !rules ) {
            continue;
        }

        for (var j = 0, k = rules.length; j < k; j++) {
            var rule = rules[j];
            all += rule.selectorText + "\n";
            if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                rule.style[style] = newstyle;
            }
        }
    }
}

function list_reload_complete(json, opaque) {
      var mode = opaque[0];
      var uuid = opaque[1];
      var page = opaque[2];
      var others = opaque[3];
      var first = opaque[4];

      var next = next_mode(others);
      
      $("#stats" + mode).html(json.desc);

      if (first) {
          $("#stats" + mode).attr('style', 'display: block');
      }

      form_loaded(false, true);

      if(next) {
          listreload(next, uuid, page, others, false);
      }
}

function listreload(mode, uuid, page, others, first) {
       var target = { read: 'memo', edit: 'edits', home: 'review' };

       if (list_mode)
           $("#stats" + mode).html(spinner + "&nbsp;<h4>" + local("loadingstatistics") + "...</h4>");

       if(first)
           $("#stats" + mode).attr('style', 'display: block');

       go(false, mode + '&uuid=' + uuid + '&' + target[mode] + 'list=1&page=' + page,
           unavailable(false), list_reload_complete, [mode, uuid, page, others, first]);
}

function installreading() {
    $('#goto').click(function() {
        var page = parseInt($('#gotoval').val());
        if (page > current_pages) {
            page = current_pages;
        }

        page -= 1;
        install_pages(current_mode, current_pages, current_uuid, page, current_view_mode, true, current_meaning_mode);
    });

    $("#gotoval").keyup(function(event){
            if(event.keyCode == 13){ $("#goto").click(); }
    });

    $('#imageButton').click(function () {
        if($('#imageButton').attr('class') == 'active btn btn-default') {
            $('#imageButton').attr('class', 'btn btn-default');
            $('#textButton').attr('class', 'active btn btn-default');
            view_images = false;
            go(false, 'home&switchmode=text', unavailable(false), false, false);
        } else {
            view_images = true;
            $('#imageButton').attr('class', 'active btn btn-default');
            $('#textButton').attr('class', 'btn btn-default');
	        go(false, 'home&switchmode=images', unavailable(false), false, false);
        }
        show_both = false;
        $('#sideButton').attr('class', 'btn btn-default');
        current_view_mode = "images";
        view(current_mode, current_uuid, current_page);
    });
    $('#sideButton').click(function () {
        if($('#sideButton').attr('class') == 'active btn btn-default') {
            $('#sideButton').attr('class', 'btn btn-default');
            $('#textButton').attr('class', 'active btn btn-default');
            show_both = false;
	        go(false, 'home&switchmode=text', unavailable(false), false, false);
        } else {
            show_both = true;
            $('#sideButton').attr('class', 'active btn btn-default');
            $('#textButton').attr('class', 'btn btn-default');
	        go(false, 'home&switchmode=both', unavailable(false), false, false);
        }
        current_view_mode = "both";
        view_images = false;
        $('#imageButton').attr('class', 'btn btn-default');
        view(current_mode, current_uuid, current_page);
    });

    $('#textButton').click(function () {
        go(false, 'home&switchmode=text', unavailable(false), false, false);
	    if (show_both == false && view_images == false) {
	   	    // already in text mode
	   	    return;
	    }
        $('#imageButton').attr('class', 'btn btn-default');
        $('#sideButton').attr('class', 'btn btn-default');
        $('#textButton').attr('class', 'active btn btn-default');
        current_view_mode = "text";
        show_both = false;
        view_images = false;
        view(current_mode, current_uuid, current_page);
    });

    $('#meaningButton').click(function () {
        if($('#meaningButton').attr('class') == 'active btn btn-default') {
            $('#meaningButton').attr('class', 'btn btn-default');
            current_meaning_mode = false;
            go(false, 'read&meaningmode=false', unavailable(false), false, false);
            reveal_all(true);
       } else {
            $('#meaningButton').attr('class', 'active btn btn-default');
            current_meaning_mode = true;
            go(false, 'read&meaningmode=true', unavailable(false), false, false);
            reveal_all(false);
       }
    });

    var opts = Object.keys(modes); 
    for(x = 0; x < opts.length; x++) {
        tmode = opts[x];
        $('#' + tmode + 'butt').click(function () {
            for(y = 0; y < opts.length; y++) {
                $('#' + opts[y] + 'butt').attr('class', 'btn btn-default');
            }
            $(this).attr('class', 'active btn btn-default');
        });
    }
}

function syncstory(name, uuid) {
    document.getElementById(name).innerHTML = "<i class='glyphicon glyphicon-sort'></i> " + local('requesting') + "...";
    go(false, 'storylist&uuid=' + uuid + "&sync=1",
        'sync error', storylist_complete,
        { element: name, label: "<i class='glyphicon glyphicon-sort'></i> " + local('started'), cleanup: unsyncstory, uuid: uuid, name: name});
}

function storylist_complete(json, params) {
    if (!json.success) {
        $("#" + params.element).html("Error: " + json.desc);
        return;
    }
    if (json.firstload) {
        firstload = '#' + json.firstload;
        for(var tidx = 0; tidx < json.translist.length; tidx++) {
            trans_start(json.translist[tidx]);
        }
        translist = [];

        $("#" + params.element).html(json.storylist);
    } else if(json.reload) {
        loadstories(false, [false, false]);
    }

    if (params.cleanup) {
        document.getElementById(params.element).innerHTML = params.label;
        document.getElementById(params.element).onclick = function() { params.cleanup(params.name, params.uuid); };
    }
    if ("navto" in params && "storylist" in json) {
        finishedloading(json.storylist, params.navto);
    }
}

function unsyncstory(name, uuid) {
    document.getElementById(name).innerHTML = "<i class='glyphicon glyphicon-sort'></i> " + local('stopping') + "...";
    go(false, 'storylist&uuid=' + uuid + "&sync=0",
        'sync error', storylist_complete,
        { element: name, label: "<i class='glyphicon glyphicon-sort'></i> " + local('stopped'), cleanup: syncstory, uuid: uuid, name: name});
}

function finishedloading(storylist, navto) {

   var obj = $(storylist);
   for(var y = 0; y < names.length; y++) {
        var name = "#content_collapse" + names[y];
        var listname = "#listview_collapse" + names[y];
        var objresult = obj.find(name);
        var data = objresult.html();
        $(name).html(data);
        $(listname).listview().listview("refresh");
   }

   $(storylist.replace(/script/gi, 'mikescript')).find('mikescript').each(function (index, domEle) {
        if (!$(this).attr('src')) {
            eval($(this).text());
        }
   });

   if (navto) {
       $.mobile.navigate(navto);
   } else if(firstload != false && !firstloaded) {
        $.mobile.navigate(firstload);
        firstload = false;
        firstloaded = true;
   }

   done();
   $("#storypages").html("");
}

function loadstories(json, opaque) {
    navto = opaque[0];
    rotatechat = opaque[1];
    $("#storypages").html("<p/><br/>" + spinner + "&nbsp;" + local("loadingstories") + "...");
    url = 'storylist&tzoffset=' + (((new Date()).getTimezoneOffset()) * 60)
    if (rotatechat) {
        url += "&force_rotate=1";
    }
    go(false, url,
        unavailable(false),
        storylist_complete,
        { element: 'storypages', navto: navto});
}

function reviewstory(uuid, which) {
    go(false, 'home&reviewed=' + which + '&uuid=' + uuid,
        unavailable(false),
        loadstories,
        [(which == 1) ? "#reading" : "#reviewing", false]);
}

function finishstory(uuid, which) {
    go(false, 'home&finished=' + which + '&uuid=' + uuid,
        unavailable(false),
        loadstories,
        [(which == 1) ? "#finished" : "#reading", false]);
}

function checkauth(xhr) {
    if (authorization) {
        xhr.setRequestHeader("Authorization", authorization);
    }
}

$.fn.goDeep = function(levels, func){
    var iterateChildren = function(current, levelsDeep){
        func.call(current, levelsDeep);

        if(levelsDeep > 0)
            $.each(current.children(), function(index, element){
                iterateChildren($(element), levelsDeep-1);
            });
    };

    return this.each(function(){
        iterateChildren($(this), levels);
    });
};

function upload_bad(json, step) {
    done();
    if (json.success) {
        go(false, "home&delete=1&uuid=" + json.uuid + "&name=" + json.filename + "&now=1", unavailable(false), false, false);
        alert(local('requestfailed') + " (" + step + ")");
    } else {
        alert(local('reuqestfailed') + ": (" + step + "): " + json.desc);
    }
}

function upload_nextstage(json) {
    if (json.next_stage != undefined && json.next_stage) {
        start_learning('home', 'storyinit', {uuid: json.uuid, name: json.filename});
    } else {
        $.mobile.navigate('#stories');
        loadstories(false, ["#newstory", false]);
    }
    $('#uploadModal').modal('hide');
    done();
}

function validatetext_complete(json, opaque) {
    if(json.success) {
        console.log("Completing text upload to key " + json.storykey + "...");
        db.openDoc(json.storykey, {
              error: function(err) {
                    console.log("Boo open doc " + json.storykey + " failed: " + err);
                    upload_bad(json, 'cp1');
              },
              success : function(doc) {
                   console.log("Doc created, saving text...");
                   doc["txtsource"] = $("#textvalue").val();
                   db.saveDoc(doc, {
                        authorization: authorization,
                        error: function(saveerr) {
                            console.log("Boo, couldn't save TXT contents: " + saveerr);
                            upload_bad(json, 'cp2');
                        },
                        success: function(response) {
                            upload_nextstage(json);
                        }
                   });
              }
            },
            { beforeSend: checkauth }
);
    } else {
        console.log("Failed to add your story. Please try again.");
        upload_bad(json, 'cp3');
    }
}

function validatetext() {
    var ids = [ 'textname', 'textvalue', 'textlanguage' ];

    document.getElementById("colonerror").style.display = 'none';
    document.getElementById("uploaderror").style.display = 'none';

    for (var i = 0; i < ids.length; i++) {
         if ($("#" + ids[i]).val() == '') {
            document.getElementById("uploaderror").style.display = 'block';
            return;
         }
    }

    if ($("#textname").val().replace("C:\\", "").indexOf(':') != -1) {
            document.getElementById("colonerror").style.display = 'block';
            return;
    }

    loading();
    go([$("#textform"), ''], '', unavailable(false), validatetext_complete, false);
}

function validatefile_complete(json, opaque) {
    if(json.success) {
        db.openDoc(json.storykey, {
              error: function(err) {
                    console.log("Boo. Doc failed: " + err);
                    upload_bad(json, 'st1');
              },
              success : function(doc) {
                   var myFile = $('#_attachments').prop('files')[0];
                   $('.couchform input#_db').val($('#database').html());
                   $('.couchform input#_id').val(doc._id);
                   $('.couchform input#_rev').val(doc._rev);

                   var url = $('#creds').html() + "/" + $('#database').html() + "/" + doc._id;
                   console.log("Submitting to: " + url);
                   $('#filedata').ajaxSubmit({
                        xhrFields: {withCredentials: true},
                        beforeSend: checkauth,
                        url: url,
                        success: function(response) {
                            upload_nextstage(json);
                        },
                        error: function(response) {
                            // Need to call the API to delete this story,
                            // both the name and the UUID index
                            console.log("Boo. Failed to submit attachment." + response);
                            upload_bad(json, 'st2');
                        }
                   });
              }
            },
            { beforeSend: checkauth }
        );
    } else {
        console.log("Failed to add your story. Please try again.");
        upload_bad(json, 'st3');
    }
}

function rotatestories() {
    $.mobile.navigate('#stories');
    loadstories(false, [false, true]);
}

function validatefile() {
    var ids = [ '_attachments', 'uploadtype', 'uploadlanguage' ];

    document.getElementById("colonerror").style.display = 'none';
    document.getElementById("uploaderror").style.display = 'none';

    for (var i = 0; i < ids.length; i++) {
         if ($("#" + ids[i]).val() == '') {
            document.getElementById("uploaderror").style.display = 'block';
            return;
         }
    }

    if ($("#_attachments").val().replace("C:\\", "").indexOf(':') != -1) {
        document.getElementById("colonerror").style.display = 'block';
        return;
    }

    var myFile = $('#_attachments').prop('files')[0];
    if (myFile.size > (30*1024*1024)) {
        alert("Your file is too big.");
        return;
    }
    loading();
    $("#filename").val(myFile.name);
    go([$("#fileform"), ''], '', unavailable(false), validatefile_complete, false);
}

function handleIqPing(oIQ) {
    //ping: N (raw): <iq xmlns="jabber:client" from="readalien.com" to="mica_admin@readalien.com/mica2247499f" id="5458144941139737802" type="get"><ping xmlns="urn:xmpp:ping"/></iq>
    console.log("Ping!!");
    con.send(oIQ.errorReply(ERR_FEATURE_NOT_IMPLEMENTED));
    return true;
}
function handleIQ(oIQ) {
    var who = oIQ.getFromJID();
    console.log("HANDLE IQ: "  + oIQ.xml().htmlEnc());
    $('#iResp').prepend("<tr><td><div class='msg'>IN (raw): " + oIQ.xml().htmlEnc() + '</div></td></tr>');
    //document.getElementById('iResp').lastChild.scrollIntoView();
    con.send(oIQ.errorReply(ERR_FEATURE_NOT_IMPLEMENTED));
}

function appendStatus(who, msg) {
    var id = ("" + who).split("@");
	document.getElementById('iStatus').innerHTML = decodeURIComponent(id[0]) + msg;
}

function messageNotify(val) {
  flashTimer=window.setInterval(function() {
    document.title = document.title == local('alltitle') ? val : local('alltitle');
  }, 1000);
}

window.onfocus=function() {
    document.title = local('alltitle');
    clearInterval(flashTimer);
}

function who_to_readable(who) {
    var id = ("" + who).split("@");
	return decodeURIComponent(id[0]);
}

function open_or_close(html) {
        // Despite what memorization state we have in the database, the user may
        // have expanded these words in the document. We have to see if that happenened,
        // and, if true, expand them here as well.
        tmp = $(html);
        tmp.find("div.reveal").each(function() {
            var id = $(this).attr("revealid");
            var rele = document.getElementsByClassName("reveal" + id);
            if(rele != undefined && rele.length > 0 && rele[0].style.display == 'none') {
                if ($(this).attr("style") == "display: block") {
                    console.log(id + " => before definition => " + tmp.find("div.definition[definitionid='" + id + "']").attr("style"));
                    console.log(id + " => before reveal => " + tmp.find("div.reveal[revealid='" + id + "']").attr("style"));
                    tmp.find("div.definition[definitionid='" + id + "']").attr("style", "display: block");
                    tmp.find("div.reveal[revealid='" + id + "']").attr("style", "display: none");
                    console.log(id + " => after definition => " + tmp.find("div.definition[definitionid='" + id + "']").attr("style"));
                    console.log(id + " => after reveal => " + tmp.find("div.reveal[revealid='" + id + "']").attr("style"));
                }
            }
        });

        html = tmp.wrap('<p/>').parent().html();

        return html;
}

function make_date(ts) {
	var date = new Date(parseInt(parseFloat(ts)));
	var result = "";

	var hours = date.getHours();
	var ampm = (hours >= 12) ? "PM" : "AM";
	
	if (hours >= 13)
		hours -= 12;
	
	result += ('0' + (hours == 0 ? 12 : hours)).slice(-2);
	result += ":" + ('0' + date.getMinutes()).slice(-2);
	result += " " + ampm;
	
	//result += " " + ("" + date.getFullYear()).substring(2, 4);
	//result += "/" + ('0' + (date.getMonth()+1)).slice(-2);
	//result += "/" + ('0' + date.getDate()).slice(-2);
	
	//tdebug("Timestamp: " + result + " from original: " + ts);
	return result;
}

function getPairs() {
    var languagepair = $('#chattextlanguage').val();
    var pair = languagepair.split(",");
    return pair;
}

function install_pages_if_needed(json) {
    done();
    $('#regroupModal').modal('hide');
    $('#reviewModal').modal('hide');

    if ("install_pages" in json) {
        install_pages(json.install_pages.action,
                      json.install_pages.pages,
                      json.install_pages.uuid,
                      json.install_pages.start_page,
                      json.install_pages.view_mode,
                      json.install_pages.reload,
                      json.install_pages.meaning_mode)
        console.log("Finish page installation.");
    }

}

function retrans_complete(json) {
   install_pages_if_needed(json);
}

function start_learning_complete(json, action) {
    var reloadstories = (action == 'view') ? false : true;
    done();
    $('.ui-listview').listview().listview('refresh');
    $('#loadingModal').modal('hide');
    if (!reloadstories) {
        $('#readingheader').affix();
        $('#readingheader').on('affix-top.bs.affix', function() { return false; });
        $('#learn_content').html(json.desc);
        $.mobile.navigate('#learn');
    }
    if (json.success) {
            learn_loaded = true;
            install_pages_if_needed(json);
    } else {
        alert(json.desc);
    }

    if (reloadstories) {
        $.mobile.navigate('#stories');
        loadstories(false, [false, false]);
    }
}

function explode(uuid, name, rname, translated, finished, reviewed, ischat, syncstatus, romanized, newstory) {

    exploded_uuid = uuid;
    exploded_name = name;
    $("#explodedstory").html(rname);
    $("#readoption").attr('style', 'display: none');
    $("#reviewoption").attr('style', 'display: none');
    $("#editoption").attr('style', 'display: none');
    $("#forgetoption").attr('style', 'display: none');
    $("#finishedoption").attr('style', 'display: none');
    $("#notfinishedoption").attr('style', 'display: none');
    $("#reviewedoption").attr('style', 'display: none');
    $("#notreviewedoption").attr('style', 'display: none');
    $("#deleteoption").attr('style', 'display: none');
    $("#translateoption").attr('style', 'display: none');
    $("#romanizedoption").attr('style', 'display: none');
    $("#storyinitoption").attr('style', 'display: none');
    $("#syncstatus").attr('style', 'display: none');
    $("#originaloption").attr('style', 'display: none');

    if (translated) {
        if (romanized) {
            $("#romanizedoption").attr('style', 'display: block');
        }

        $("#readoption").attr('style', 'display: block');
        $("#reviewoption").attr('style', 'display: block');
        $("#editoption").attr('style', 'display: block');
        $("#forgetoption").attr('style', 'display: block');
        $("#originaloption").attr('style', 'display: block');

        if (finished) {
            $("#notfinishedoption").attr('style', 'display: block');
        } else if(reviewed) {
            if (!ischat) {
                $("#notreviewedoption").attr('style', 'display: block');
                $("#finishedoption").attr('style', 'display: block');
            }
        } else {
            $("#reviewedoption").attr('style', 'display: block');
        }
    } else if (newstory) {
        $("#storyinitoption").attr('style', 'display: block');
        $("#deleteoption").attr('style', 'display: block');
    } else {
        $("#deleteoption").attr('style', 'display: block');
        $("#translateoption").attr('style', 'display: block');
        $("#originaloption").attr('style', 'display: block');
    }

    if (!newstory) {
        if (syncstatus) {
            $("#syncstatus").html("<a id='" + name + "' onclick=\"syncstory('" + name + "', '" + uuid + "')\"><i class='glyphicon glyphicon-sort'></i> " + local('startsync') + "</a>");
        } else {
            $("#syncstatus").html("<a id='" + name + "' onclick=\"unsyncstory('" + name + "', '" + uuid + "')\"><i class='glyphicon glyphicon-sort'></i> " + local('stopsync') + "</a>");
        }
        $("#syncstatus").attr('style', 'display: block');
    }
    $('#explodelist').listview().listview('refresh');
    $('.ui-listview').listview().listview('refresh');
    $.mobile.navigate('#explode');
}

function start_learning(mode, action, values) {
    $('#loadingModal').modal({backdrop: 'static', keyboard: false, show: true});

    var url = mode + '&' + action + "=1";

    if (values.uuid)
        url += "&uuid=" + values.uuid;
    if (values.name)
        url += "&name=" + values.name;
    if (values.version)
        url += "&version=" + values.version;

    go(false, url, unavailable(false), start_learning_complete, action);
}

function getstory_complete(json, opaque) {
    $.mobile.navigate("#printstory");
    done();
    $("#printstory_contents").html(json.desc);
}
function getstory(uuid, type) {
    loading();
    go(false, 'stories&type=' + type + '&uuid=' + uuid,
        unavailable(false), getstory_complete, false);
}

function new_manual_account_complete(json) {
    $('#account_content').html(json.desc);
    done();
}

function stripe_install(key, email, amount, description) {
    var handler = StripeCheckout.configure({
          key: key,
		  image : 'serve/icon-120x120.png',
          locale: local('language'),
          token: function(token) {
            loading();
            var url = 'account';
            url += '&charge=start';
            url += '&stripeEmail=' + token.email;
            url += '&stripeToken=' + token.id;
            go(false, url, unavailable(false), account_complete, true);
          }
        });

    $("#payButton").click(function(e) {
      handler.open({
        //zip-code: true,
        email: email,
        name: local('companyname'),
        description: description,
        amount: amount, 
      });
      e.preventDefault();
    });

    window.addEventListener('popstate', function() {
      handler.close();
    });
}
