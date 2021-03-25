local m, s, o
local fs = require "nixio.fs"
local uci=require"luci.model.uci".cursor()
local sys=require"luci.sys"
require("string")
require("io")
require("table")
function gen_template_config()
	local b
	local d=""
	local RESCONF=uci:get_first("dhcp","dnsmasq","resolvfile") or "/tmp/resolv.conf.d/resolv.conf.auto"
	for cnt in io.lines(RESCONF) do
		b=string.match (cnt,"^[^#]*nameserver%s+([^%s]+)$")
		if (b~=nil) then
			d=d.."  - "..b.."\n"
		end
	end
	local f=io.open("/usr/share/AdGuardHome1/AdGuardHome_template.yaml", "r+")
	local tbl = {}
	local a=""
	while (1) do
    	a=f:read("*l")
		if (a=="#bootstrap_dns") then
			a=d
		elseif (a=="#upstream_dns") then
			a=d
		elseif (a==nil) then
			break
		end
		table.insert(tbl, a)
	end
	f:close()
	return table.concat(tbl, "\n")
end
m = Map("AdGuardHome1")
local configpath = uci:get("AdGuardHome1","AdGuardHome","configpath")
local binpath = uci:get("AdGuardHome1","AdGuardHome","binpath")
s = m:section(TypedSection, "AdGuardHome1")
s.anonymous=true
s.addremove=false
--- config
o = s:option(TextValue, "escconf")
o.rows = 66
o.wrap = "off"
o.rmempty = true
o.cfgvalue = function(self, section)
	return  fs.readfile("/tmp/AdGuardHome1tmpconfig.yaml") or fs.readfile(configpath) or gen_template_config() or ""
end
o.validate=function(self, value)
    fs.writefile("/tmp/AdGuardHome1tmpconfig.yaml", value:gsub("\r\n", "\n"))
	if fs.access(binpath) then
		if (sys.call(binpath.." -c /tmp/AdGuardHome1tmpconfig.yaml --check-config 2> /tmp/AdGuardHome1test.log")==0) then
			return value
		end
	else
		return value
	end
	luci.http.redirect(luci.dispatcher.build_url("admin","services","AdGuardHome1","manual"))
	return nil
end
o.write = function(self, section, value)
	fs.move("/tmp/AdGuardHome1tmpconfig.yaml",configpath)
end
o.remove = function(self, section, value)
	fs.writefile(configpath, "")
end
--- js and reload button
o = s:option(DummyValue, "")
o.anonymous=true
o.template = "AdGuardHome1/yamleditor"
if not fs.access(binpath) then
	o.description=translate("WARNING!!! no bin found apply config will not be test")
end
--- log 
if (fs.access("/tmp/AdGuardHome1tmpconfig.yaml")) then
local c=fs.readfile("/tmp/AdGuardHome1test.log")
if (c~="") then
o = s:option(TextValue, "")
o.readonly=true
o.rows = 5
o.rmempty = true
o.name=""
o.cfgvalue = function(self, section)
	return fs.readfile("/tmp/AdGuardHome1test.log")
end
end
end
function m.on_commit(map)
	local ucitracktest=uci:get("AdGuardHome1","AdGuardHome","ucitracktest")
	if ucitracktest=="1" then
		return
	elseif ucitracktest=="0" then
		io.popen("/etc/init.d/AdGuardHome1 reload &")
	else
		fs.writefile("/var/run/AdGlucitest","")
	end
end
return m